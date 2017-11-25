const axios = require('axios')

let simplerItems

function init() {
  return []
}

function fetchAlbums(accessToken, list, url) {
  return axios({
    method: 'get',
    url: url ? url : 'https://api.spotify.com/v1/me/albums?limit=50',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }).then((resp) => {
    const data = resp.data
    list.push( ...formatAlbums(data) )
    if (data.next) {
      return fetchAlbums(accessToken, list, data.next)
    }
  })
}

function formatAlbums(spotifyObj) {
  return spotifyObj.items.map((item) => {
    const album = item.album
    return {
      id: album.id,
      uri: album.uri,
      name: album.name,
      artists: album.artists.map((aT) => {
        return { id: aT.id, name: aT.name, uri: aT.uri }
      }),
      year: (album.release_date_prec !== 'year' ? album.release_date.substring(0, 4) : album.release_date),
      tracks: album.tracks.items.map((tT) => {
        return {
          id: tT.id,
          uri: tT.uri,
          name: tT.name,
          disc: tT.disc_number,
          track: tT.track_number,
        }
      })
    }
  })
}

function refresh(accessToken) {
  const someList = []
  return fetchAlbums(accessToken, someList).then(() => {
    simplerItems = someList
  })
}

simplerItems = init()

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

function getArtists(criteria) {
  const artistObj = filteredItems(criteria, 0).reduce((hash, item) => {
    item.artists.forEach((artist) => {
      hash[artist.uri] = artist.name
    })
    return hash
  }, {})

  return hashToSortedArr(artistObj)
}

function getYears(criteria) {
  const obj = filteredItems(criteria, 1).reduce((hash, item) => {
    hash[item.year] = item.year
    return hash
  }, {})

  return hashToSortedArr(obj)
}

function getAlbums(criteria) {
  const obj = filteredItems(criteria, 2).reduce((hash, item) => {
    hash[item.uri] = item.name
    return hash
  }, {})

  return hashToSortedArr(obj)
}

function getAlbumDetails(albumId) {
  return simplerItems.filter(item => item.uri === albumId)[0]
}

function filter(criteria) {
  return {
    artists: getArtists(criteria),
    years: getYears(criteria),
    albums: getAlbums(criteria),
  }
}

function selectAlbum(albumId) {
  return getAlbumDetails(albumId)
}

module.exports = { filter, selectAlbum, refresh }