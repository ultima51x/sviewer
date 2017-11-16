import React from 'react'

import AlbumDetails from '../containers/AlbumDetails'
import FilterContainer from '../containers/FilterContainer'

import './Main.scss'

export default function Main(_props) {
  return (
    <div className="main">
      <FilterContainer />
      <AlbumDetails />
    </div>
  )
}