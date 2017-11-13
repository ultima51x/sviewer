import React from 'react'
import ArtistFilter from '../containers/ArtistFilter'
import AlbumFilter from '../containers/AlbumFilter'
import YearFilter from '../containers/YearFilter'

import './FilterContainer.scss'

export default function FilterContainer(_props) {
  return (
    <div className="filter-container">
      <ArtistFilter />
      <YearFilter />
      <AlbumFilter />
    </div>
  )
}