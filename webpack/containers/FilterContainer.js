import React from 'react'
import Filter from '../components/Filter'

import { connect } from 'react-redux'
import { filter, selectAlbum } from '../actions'

import './FilterContainer.scss'

const mapStateToProps = (state, _ownProps) => {
  return {
    artists: state.artists,
    years: state.years,
    albums: state.albums,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilter: (criteria) => {
      dispatch(filter(criteria))
    },
    onSelect: (albumId) => {
      dispatch(selectAlbum(albumId))
    }
  }
}

class FilterContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { criteria: {} }
    this.priorities = {
      artists: 2,
      years: 1,
      albums: 0,
    }
  }

  setFilter(keyName, arr) {
    const newCrit = { ...this.state.criteria }  // copy

    for (const k of Object.keys(newCrit)) {
      if (this.priorities[keyName] >= this.priorities[k]) {
        delete newCrit[k]
      }
    }

    newCrit[keyName] = arr
    this.setStateAndDispatchFilter(newCrit)

    if (keyName === 'albums' && arr.length === 1) {
      this.props.onSelect(arr[0])
    }
  }

  setStateAndDispatchFilter(newCrit) {
    this.props.onFilter(newCrit)
    this.setState({ criteria: newCrit })
  }

  render() {
    return (
      <div className="filter-container">
        <button onClick={() => this.setStateAndDispatchFilter({})}>Clear</button>
        <Filter list={this.props.artists} onFilter={this.setFilter.bind(this)}
          keyName='artists' priority={this.priorities.artists}
          criteria={this.state.criteria.artists} />
        <Filter list={this.props.years} onFilter={this.setFilter.bind(this)}
          keyName='years' priority={this.priorities.years}
          criteria={this.state.criteria.years} />
        <Filter list={this.props.albums} onFilter={this.setFilter.bind(this)}
          keyName='albums' priority={this.priorities.albums}
          criteria={this.state.criteria.albums} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)