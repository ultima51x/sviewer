import tempJSON from './tempJson.json'

const simplerItems = tempJSON.items.map((item) => {
  const album = item.album
  return {
    artists: album.artists.map((aT) => {
      return { name: aT.name, uri: aT.uri }
    }),
    year: (album.release_date_prec !== 'year' ? album.release_date.substring(0, 4) : album.release_date),
    name: album.name,
    uri: album.uri,
    tracks: album.tracks.items.map((tT) => {
      return {
        disc: tT.disc_number,
        track: tT.track_number,
        uri: tT.uri,
      }
    })
  }
})

function hashToSortedArr(hash) {
  const sorted = Object.entries(hash).sort((a, b) => a[1].localeCompare(b[1]))
  return sorted.map((item) => {
    return {
      id: item[0],
      value: item[1]
    }
  })
}

export function getArtists() {
  const artistObj = simplerItems.reduce((hash, item) => {
    item.artists.forEach((artist) => {
      hash[artist.uri] = artist.name
    })
    return hash
  }, {})

  return hashToSortedArr(artistObj)
}

// TODO figure out how to dedupe getAlbums and getYears
export function getAlbums() {
  const obj = simplerItems.reduce((hash, item) => {
    hash[item.uri] = item.name
    return hash
  }, {})

  return hashToSortedArr(obj)
}

export function getYears() {
  const obj = simplerItems.reduce((hash, item) => {
    hash[item.year] = item.year
    return hash
  }, {})

  return hashToSortedArr(obj)
}