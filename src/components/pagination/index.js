import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './pagination.css'
import cx from 'classnames'

export default function Pagination (props) {
  const numItemsToRetrieve = props.numPages * props.itemsPerPage
  const url = `https://randomuser.me/api?results=${numItemsToRetrieve}`
  const createAscendingArray = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  const pageLinksText = createAscendingArray(1, props.numPages)

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  /*
  Defined outside of the useEffect() because React complains if your function passed to
  useEffect() is an async.
   */
  const fetchData = async () => {
    await fetch(url)
      .then(response => response.json())
      .then(data => setData(data.results))
  }

  useEffect(() => {
    fetchData()
  }, []) // call only once in lifecycle

  useEffect(() => {
    console.log(`page = ${currentPage}`)
  }, [currentPage])

  const ptr = currentPage * props.itemsPerPage
  return (
    <div id='container'>
      {/* TO DO: replace HTML table with FlexBox or CSS Grid solution */}
      <table id='results-table'>
        <thead><tr><th>name</th><th>age</th><th>email</th></tr></thead>
        <tbody>
          {
            data.slice(ptr, ptr + props.itemsPerPage).map((record, i) => {
              return (
                <tr key={`row_${i}`}>
                  <td>{record.name.first} {record.name.last}</td>
                  <td>{record.dob.age}</td>
                  <td>{record.email}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div id='page-links'>
        {
          pageLinksText.map((page) => (
            <div
              key={`page_${page}`}
              className={cx({ 'page-link': true, selected: Number(page) === (currentPage + 1) })}
              onClick={() => setCurrentPage(Number(page) - 1)}
            >{page}</div>
          ))
        }
      </div>
    </div>
  )
}
Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  numPages: PropTypes.number
}
Pagination.defaultProps = {
  itemsPerPage: 5,
  numPages: 4
}
