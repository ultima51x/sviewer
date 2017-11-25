import { FILTER, SELECT } from '../actions'

const artists = (state = [], action) => {
  switch (action.type) {
  case FILTER:
    return action.data.artists
  case SELECT:
    return state
  default:
    return []
  }
}

export default artists