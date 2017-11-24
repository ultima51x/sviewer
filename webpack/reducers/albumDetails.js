import { getAlbumDetails } from './tempStore'
import { FILTER, SELECT } from '../actions'

const albumDetails = (state = null, action) => {
  switch(action.type) {
  case SELECT:
    return getAlbumDetails(action.albumId)
  case FILTER:
    return state
  default:
    return null
  }
}

export default albumDetails