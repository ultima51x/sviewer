import React from 'react'

import './Filter.scss'

export default function Filter(props) {
  // active class
  return (
    <div className="list-group filter">
      {props.list.map((elem) =>
        <a key={elem.id} href="#" className="list-group-item active">{elem.value}</a>
      )}
    </div>
  )
}