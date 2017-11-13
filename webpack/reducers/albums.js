import { getAlbums } from './tempStore'

const albums = (_state = [], _action) => {
  return getAlbums()
}

export default albums