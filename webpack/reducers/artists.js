import { getArtists } from './tempStore'
import { FILTER } from '../actions'

const artists = (_state = [], action) => {
  switch (action.type) {
  case FILTER:
    return getArtists(action.criteria)
  default:
    return getArtists({})
  }
}

export default artists