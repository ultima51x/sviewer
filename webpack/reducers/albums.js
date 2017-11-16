import { getAlbums } from './tempStore'
import { FILTER } from '../actions'

const albums = (_state = [], action) => {
  switch (action.type) {
  case FILTER:
    return getAlbums(action.criteria)
  default:
    return getAlbums({})
  }
}

export default albums