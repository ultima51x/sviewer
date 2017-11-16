import React from 'react'
import Filter from '../components/Filter'

import { connect } from 'react-redux'
import { filter } from '../actions'

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
    onSelect: (criteria) => {
      dispatch(filter(criteria))
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
    this.setStateAndDispatch(newCrit)
  }

  setStateAndDispatch(newCrit) {
    this.props.onSelect(newCrit)
    this.setState({ criteria: newCrit })
  }

  render() {
    return (
      <div className="filter-container">
        <button onClick={() => this.setStateAndDispatch({})}>Clear</button>
        <Filter list={this.props.artists} onSelect={this.setFilter.bind(this)}
          keyName='artists' priority={this.priorities.artists}
          criteria={this.state.criteria.artists} />
        <Filter list={this.props.years} onSelect={this.setFilter.bind(this)}
          keyName='years' priority={this.priorities.years}
          criteria={this.state.criteria.years} />
        <Filter list={this.props.albums} onSelect={this.setFilter.bind(this)}
          keyName='albums' priority={this.priorities.albums}
          criteria={this.state.criteria.albums} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)