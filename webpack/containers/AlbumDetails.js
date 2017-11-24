import React from 'react'

import { connect } from 'react-redux'
import './AlbumDetails.scss'

const mapStateToProps = (state, _ownProps) => {
  return { album: state.albumDetails }
}

function prettyArtistName(artists) {
  return artists.map((a) => a.name).join(',')
}

function AlbumDetails(props) {
  if (!props.album) {
    return (
      <h1 className="album-details">
      </h1>
    )
  } else {
    const trackList = props.album.tracks.map((track) => 
      <li key={track.uri}>
        {track.disc}-{track.track}. <a href={track.uri}>{track.name}</a>
      </li>
    )

    return (
      <h1 className="album-details">
        <p>Artist: {prettyArtistName(props.album.artists)}</p>
        <p>Album: {props.album.name}</p>
        <a href={props.album.uri}>ALBUM LINK</a>
        <ul>
          { trackList }
        </ul>
      </h1>
    )
  }
}

export default connect(mapStateToProps, null)(AlbumDetails)