import { FILTER, SELECT } from '../actions'

const albums = (state = [], action) => {
  switch (action.type) {
  case FILTER:
    return action.data.albums
  case SELECT:
    return state
  default:
    return []
  }
}

export default albums