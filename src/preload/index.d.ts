import { ElectronAPI } from '@electron-toolkit/preload'
import { IpcRendererAPI } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: IpcRendererAPI
  }
}
