import { FILTER, SELECT } from '../actions'

const albumDetails = (state = null, action) => {
  switch(action.type) {
  case SELECT:
    return action.data
  case FILTER:
    return state
  default:
    return null
  }
}

export default albumDetails