export const FILTER = 'FILTER'
export const SELECT = 'SELECT'

export function filter(criteria) {
  return { type: FILTER, criteria }
}

export function selectAlbum(albumId) {
  return { type: SELECT, albumId }
}