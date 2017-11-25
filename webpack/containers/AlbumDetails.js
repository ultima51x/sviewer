import React from 'react'

import { connect } from 'react-redux'
import './AlbumDetails.scss'

const mapStateToProps = (state, _ownProps) => {
  return { album: state.albumDetails }
}

function prettyArtistName(artists) {
  return artists.map((a) => 
    <li key={a.id}>
      <h4><a href={a.uri}>{a.name}</a></h4>
    </li>
  )
}

function trackList(tracks) {
  return tracks.map((track) => 
    <li key={track.id}>
      <a href={track.uri}>{track.disc}-{track.track}. {track.name}</a>
    </li>
  )
}

function AlbumDetails(props) {
  if (!props.album) {
    return (
      <h1 className="album-details">
      </h1>
    )
  } else {
    return (
      <div className="album-details">
        <h2><a href={props.album.uri}>{props.album.name}</a></h2>
        <ul className="album-details__albumlist">
          {prettyArtistName(props.album.artists)}
        </ul>
        <ul className="album-details__tracklist">
          { trackList(props.album.tracks) }
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(AlbumDetails)