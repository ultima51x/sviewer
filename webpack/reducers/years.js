import { getYears } from './tempStore'
import { FILTER } from '../actions'

const years = (_state = [], action) => {
  switch (action.type) {
  case FILTER:
    return getYears(action.criteria)
  default:
    return getYears({})
  }
}

export default years