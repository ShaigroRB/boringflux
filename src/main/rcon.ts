import EventEmitter from 'node:events'
import { Socket, createConnection } from 'node:net'
import { DEFAULTS, Constants, EventRefinedTransformer, EventStringTransformer } from '@shared/rcon'
import { EMITTED_EVENTS } from '@shared/events'

export class Rcon extends EventEmitter {
  private host: string
  private port: number
  private password: string
  private _tcpSocket!: Socket
  private isMock: boolean

  constructor({ isMock = false }) {
    super()

    this.host = DEFAULTS.HOST
    this.port = DEFAULTS.PORT
    this.password = DEFAULTS.PASSWORD
    this.isMock = isMock

    EventEmitter.call(this)
  }

  public send_request = (type: number, data: string): void => {
    /*
     * final_packet is a concatenation of:
     * - a short (16-bit integer) corresponding to the request's type
     * - a string corresponding to the parameters specific for each request type
     */

    // https://github.com/Spasman/rcon_example/blob/master/example.py#L133
    const size = 2 + Buffer.byteLength(data) + 2
    const sendBuf = Buffer.alloc(size)
    sendBuf.writeInt16LE(type, 0)
    sendBuf.write(data, 2)
    sendBuf.writeInt16LE(0, size - 2)
    this._sendSocket(sendBuf)
  }

  public send_request_with_id = (type: number, id: string, data: string): void => {
    /*
     * final_packet is a concatenation of:
     * - a short (16-bit integer) corresponding to the request's type
     * - a string corresponding to the parameters specific for each request type
     */

    const data_with_id = `"${id}" "${data}"`
    console.log(`${type}, ${data_with_id}`)
    this.send_request(type, data_with_id)
  }

  private _sendSocket = (buf: Buffer): void => {
    if (this._tcpSocket) {
      this._tcpSocket.write(buf.toString('binary'), 'binary')
    }
  }

  public connect = (host: string, port: number, pwd: string): void => {
    this.host = host
    this.port = port
    this.password = pwd

    if (this.isMock) {
      this.emit(EMITTED_EVENTS.rcon.CONNECT)
      this.emit(EMITTED_EVENTS.rcon.NEW_EVENT, 'nothing')
      return
    }

    this._tcpSocket = createConnection(this.port, this.host)
    this._tcpSocket
      .on('data', (data) => {
        this._tcpSocketOnData(data)
      })
      .on('connect', () => {
        this.socketOnConnect()
      })
      .on('error', (err) => {
        this.emit('error', err)
        console.log(err)
      })
      .on('end', () => {
        this.socketOnEnd()
      })
  }

  public disconnect = (): void => {
    if (this._tcpSocket) {
      this._tcpSocket.end()
    }
  }

  public setTimeout = (timeout: number, callback: () => void): void => {
    if (!this._tcpSocket) return
    this._tcpSocket.setTimeout(timeout, () => {
      this._tcpSocket.end()
      if (callback) callback()
    })
  }

  private _tcpSocketOnData = (data: Buffer): void => {
    /*
     * response packet is a concatenation of:
     * - the start delimiter "┐" - 3 bytes
     * - a short (16-bit integer) corresponding to the size of the JSON - 2 bytes
     * - a short (16-bit integer) corresponding to eventID of the RCON event - 2 bytes
     * - the JSON - use the size (+4 bytes??)
     * - the end delimiter "└" - 3 bytes
     */

    const DELIMITER_BYTES = 3
    const SIZE_BYTES = 2
    const TYPE_BYTES = 2

    const size = data.readInt16LE(DELIMITER_BYTES)
    const type = data.readInt16LE(DELIMITER_BYTES + SIZE_BYTES)
    const jsonData = data.toString('utf8', DELIMITER_BYTES + SIZE_BYTES + TYPE_BYTES, size + 4)

    // const json = EventStringTransformer.formatEvent(jsonData)
    const json = EventRefinedTransformer.formatEvent(jsonData)

    // too many LOG_MESSAGE & RCON_PING, no need to show them for debugging
    if (type !== Constants.EventTypes.RCON_PING && type !== Constants.EventTypes.LOG_MESSAGE) {
      this.emit(EMITTED_EVENTS.rcon.NEW_EVENT, json)
    }

    if (type === Constants.EventTypes.REQUEST_DATA) {
      this.emit(EMITTED_EVENTS.rcon.NEW_EVENT, json)
    }

    switch (type) {
      case Constants.EventTypes.RCON_LOGGED_IN: {
        console.log('WOOOOOOOHOOOOO! We logged in!')
        console.log('To avoid too much verbose, ping events are hidden.')
        break
      }
      case Constants.EventTypes.RCON_PING: {
        this.send_request(Constants.RequestTypes.PING, 'prout')
        break
      }
      default: {
        console.log({ size, type: Constants.EventTypes[type], json })
      }
    }
  }

  public socketOnConnect = (): void => {
    this.emit('connect')
    this.send_request(Constants.RequestTypes.LOGIN, this.password)
  }

  public socketOnEnd = (): void => {
    this.emit('end')
  }

  public test_request_data = (): void => {
    setTimeout(() => {
      this.send_request_with_id(Constants.RequestTypes.REQUEST_PLAYER, 'player', '0')
    }, 1_000)
    setTimeout(() => {
      this.send_request_with_id(Constants.RequestTypes.REQUEST_MATCH, 'match', '0')
    }, 3_000)
    setTimeout(() => {
      this.send_request_with_id(Constants.RequestTypes.REQUEST_SCOREBOARD, 'scoreboard', '0')
    }, 5_000)
  }
}
