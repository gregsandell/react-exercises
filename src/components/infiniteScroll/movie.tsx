import React from 'react'
import { OmdbSearchItem } from './types'
import noPoster from './noPoster.png'

const Movie = (props: { dataSource: OmdbSearchItem}) => {
  const posterSrc = props.dataSource.Poster !== 'N/A'
    ? props.dataSource.Poster
    : noPoster
  return (
    <div>
      <img src={posterSrc} style={{ height: 100, width: 'auto' }} alt={props.dataSource.Title} />
      {props.dataSource.Title}
    </div>
  )
}

export default Movie
