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

function filteredItems(criteria, priority) {
  return simplerItems.filter((item) => {
    let chain = []
    if ('artists' in criteria && priority > 0) {
      const iArtists = item.artists.map((a) => a.uri)
      chain.push(iArtists.filter((n) => criteria.artists.includes(n)).length > 0)
    }
    if ('years' in criteria && priority > 1) {
      chain.push(criteria.years.filter((n) => item.year == n).length > 0)
    }
    if ('albums' in criteria && priority > 2) {
      chain.push(criteria.albums.filter((n) => item.uri == n).length > 0)
    }

    if (chain.length == 0) {
      return true
    } else {
      return chain.filter((n) => !n).length == 0
    }
  })
}

function hashToSortedArr(hash) {
  const sorted = Object.entries(hash).sort((a, b) => a[1].localeCompare(b[1]))
  return sorted.map((item) => {
    return {
      id: item[0],
      value: item[1]
    }
  })
}

export function getArtists(criteria) {
  const artistObj = filteredItems(criteria, 0).reduce((hash, item) => {
    item.artists.forEach((artist) => {
      hash[artist.uri] = artist.name
    })
    return hash
  }, {})

  return hashToSortedArr(artistObj)
}

export function getYears(criteria) {
  const obj = filteredItems(criteria, 1).reduce((hash, item) => {
    hash[item.year] = item.year
    return hash
  }, {})

  return hashToSortedArr(obj)
}

export function getAlbums(criteria) {
  const obj = filteredItems(criteria, 2).reduce((hash, item) => {
    hash[item.uri] = item.name
    return hash
  }, {})

  return hashToSortedArr(obj)
}
