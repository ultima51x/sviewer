import { getAlbums } from './tempStore'
import { FILTER, SELECT } from '../actions'

const albums = (state = [], action) => {
  switch (action.type) {
  case FILTER:
    return getAlbums(action.criteria)
  case SELECT:
    return state
  default:
    return getAlbums({})
  }
}

export default albums