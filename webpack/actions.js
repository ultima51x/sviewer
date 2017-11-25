import { ipcRenderer } from 'electron'

export const FILTER = 'FILTER'
export const SELECT = 'SELECT'

export function filter(criteria) {
  return new Promise((res, _rej) => {
    ipcRenderer.on('event:filter:end', (event, data) => {
      res({type: FILTER, data: data})
    })
    ipcRenderer.send('event:filter:start', criteria)
  })
}

export function selectAlbum(albumId) {
  return new Promise((res, _rej) => {
    ipcRenderer.on('event:select:end', (event, data) => {
      res({type: SELECT, data: data})
    })
    ipcRenderer.send('event:select:start', albumId)
  })
}