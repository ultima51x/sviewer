import React from 'react'

import { connect } from 'react-redux'

import Filter from '../components/Filter'

const mapStateToProps = (state, _ownProps) => {
  return {
    artists: state.artists
  }
}

function ArtistFilter(props) {
  return (
    <Filter list={props.artists} />
  )
}

export default connect(mapStateToProps, null)(ArtistFilter)