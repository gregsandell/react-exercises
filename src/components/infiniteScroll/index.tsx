import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import {OmdbSearchItem, OmdbSearchResponse} from './types'
import { fetchMovies } from './fetchMovies'
import Movie from './movie'
// TO DO Style output more nicely, use all of the data (including making an IMDB link)
// import style from './infiniteScroll.module.css'

const InfiniteScroll = () => {
  const [data, setData] = useState<OmdbSearchItem[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('john')

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<any, any> = await fetchMovies(searchTerm, currentPage)
      console.log(response)
      if (response.data.Error) {
        setData([])
      } else {
        const newData = response.data.Search
        setData([...data, ...newData])
      }
    })()
  }, [searchTerm, currentPage])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = ():void => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      setCurrentPage((previousValue) => ++previousValue)
    }
  }

  const searchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData([])
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div>
      <h1>Infinite Scroll!</h1>
      Search Term:
      <input
        type='text'
        onChange={searchTermChange}
        value={searchTerm}
        alt='Search Term'
      />
      <div id='scrollable' onScroll={handleScroll}>
        {data.map((movie, i) => (
          <Movie dataSource={movie} key={i} />
        ))}
      </div>
    </div>
  )
}
export default InfiniteScroll
