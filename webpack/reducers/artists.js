import { getArtists } from './tempStore'
import { FILTER, SELECT } from '../actions'

const artists = (state = [], action) => {
  switch (action.type) {
  case FILTER:
    return getArtists(action.criteria)
  case SELECT:
    return state
  default:
    return getArtists({})
  }
}

export default artists