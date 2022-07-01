import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './autocomplete.css'
import cx from 'classnames'

// the exported component can be either a function or a class

const Match = (props) => {
  const [highlight, setHighlight] = useState(false)
  return (
    <li
      className={cx({ match: highlight || props.first })}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    >
      {props.children}
    </li>
  )
}
Match.propTypes = {
  children: PropTypes.string.isRequired,
  first: PropTypes.boolean
}
Match.defaultProps = {
  first: false
}

const Autocomplete = (props) => {
  const [input, setInput] = useState('')
  const noMatchLI = (<li className='no-match' key={0}>No matches</li>)
  const [matchElems, setMatchElems] = useState([noMatchLI])
  const handleInput = (e) => {
    e.preventDefault()
    const value = e.target.value.trim()
    setInput(value)
    setMatchElems([noMatchLI])
    let matches = []
    if (value.length) {
      matches = props.suggestions.reduce((accum, sugg) => {
        if (sugg.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          accum.push(sugg)
        }
        return accum
      }, [])
      setMatchElems(matches.map((match, i) => {
        return (<Match first={i === 0} key={i}>{match}</Match>)
      }))
    }
  }
  return (
    <div className='wrapper'>
      <h1>Autocomplete</h1>
      <div className='control'>
        <input type='text' value={input} onChange={handleInput} className='input' />
        <ul className='matches'>
          {matchElems.map((match) => match)}
        </ul>
      </div>
      <div className='list is-hoverable' />
    </div>
  )
}
Autocomplete.propTypes = {
  suggestions: PropTypes.array
}

Autocomplete.defaultProps = {}
export default Autocomplete
