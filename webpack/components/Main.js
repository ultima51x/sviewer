import React from 'react'

import AlbumDetails from '../containers/AlbumDetails'
import FilterContainer from './FilterContainer'

import './Main.scss'

export default function Main(_props) {
  return (
    <div className="main">
      <FilterContainer />
      <AlbumDetails />
    </div>
  )
}