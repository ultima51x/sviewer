import { FILTER, STATE } from '../actions'

const years = (state = [], action) => {
  switch (action.type) {
  case FILTER:
    return action.data.years
  case STATE:
    return state
  default:
    return []
  }
}

export default years