import React from 'react'

import { connect } from 'react-redux'
import './AlbumDetails.scss'

const mapStateToProps = (state, _ownProps) => {
  return {
    artist: state.albumDetails.artist
  }
}

function AlbumDetails(props) {
  return (
    <h1 className="album-details">
      Album Details
      <p>Artist: {props.artist}</p>
    </h1>
  )
}

export default connect(mapStateToProps, null)(AlbumDetails)