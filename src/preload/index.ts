import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { EMITTED_EVENTS } from '@shared/events'

export type IpcRendererAPI = {
  rconConnect: (host: string, port: number, password: string) => void
}

// Custom APIs for renderer
const api: IpcRendererAPI = {
  rconConnect: (host: string, port: number, password: string) =>
    ipcRenderer.send(EMITTED_EVENTS.renderer.CONNECT, { host, port, password })
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
