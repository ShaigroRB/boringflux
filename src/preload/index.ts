import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export type IpcRendererAPI = {
  rconConnect: (host: string, port: number, password: string) => void
  rconListenToEvents: () => any
}

// Custom APIs for renderer
const api: IpcRendererAPI = {
  rconConnect: (host: string, port: number, password: string) =>
    electronAPI.ipcRenderer.send('rcon_connect', { host, port, password }),
  rconListenToEvents: () => 'toto'
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
