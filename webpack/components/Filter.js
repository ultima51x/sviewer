import React from 'react'

import './Filter.scss'

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.onSelectHandler = props.onSelect
    this.keyName = props.keyName
    this.priority = props.priority
    this.criteria = props.criteria || []
  }

  handleClick(evt, keyId) {
    // //// not working
    // if (evt.ctrlKey) {
    // 	alert('ctrl')
    // } else if (evt.shiftKey) {
    // 	alert('shift')
    // }
    this.onSelectHandler(this.keyName, [keyId])
  }

  isKey(keyId) {
    return new Set(this.props.criteria).has(keyId)
  }

  render() {
    // active class
    return (
      <div className="list-group filter">
        {
          this.props.list.map((elem) =>
            <a
              className={`${this.isKey(elem.id) ? 'active' : ''} list-group-item`}
              key={elem.id}
              onClick={(e) => this.handleClick(e, elem.id)}
              href="#">{elem.value}</a>
          )}
      </div>
    )
  }
}