import { combineReducers } from 'redux'

import artists from './artists'
import years from './years'
import albums from './albums'
import albumDetails from './albumDetails'

const reducers = combineReducers({
  artists,
  years,
  albums,
  albumDetails,
})

export default reducers