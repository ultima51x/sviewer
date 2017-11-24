import { getYears } from './tempStore'
import { FILTER, STATE } from '../actions'

const years = (state = [], action) => {
  switch (action.type) {
  case FILTER:
    return getYears(action.criteria)
  case STATE:
    return state
  default:
    return getYears({})
  }
}

export default years