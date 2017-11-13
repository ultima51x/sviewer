import { getArtists } from './tempStore'

const artists = (_state = [], _action) => {
  return getArtists()
}

export default artists