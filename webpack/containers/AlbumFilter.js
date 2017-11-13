import React from 'react'

import { connect } from 'react-redux'

import Filter from '../components/Filter'

const mapStateToProps = (state, _ownProps) => {
  return {
    albums: state.albums
  }
}

function AlbumFilter(props) {
  return (
    <Filter list={props.albums} />
  )
}

export default connect(mapStateToProps, null)(AlbumFilter)