import React from 'react'

import { connect } from 'react-redux'

import Filter from '../components/Filter'

const mapStateToProps = (state, _ownProps) => {
  return {
    years: state.years
  }
}

function YearFilter(props) {
  return (
    <Filter list={props.years} />
  )
}

export default connect(mapStateToProps, null)(YearFilter)