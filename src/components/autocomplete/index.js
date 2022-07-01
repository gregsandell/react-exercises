import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './autocomplete.css'
import cx from 'classnames'

const Match = (props) => {
  const [highlight, setHighlight] = useState(false)
  return (
    <li
      className={cx({ match: highlight || props.first })}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  )
}
Match.propTypes = {
  children: PropTypes.string.isRequired,
  first: PropTypes.bool,
  onClick: PropTypes.func
}
Match.defaultProps = {
  first: false
}

const Autocomplete = (props) => {
  const [input, setInput] = useState('')
  const noMatchLI = (<li className='no-match' key={0}>No matches</li>)
  const [matchElems, setMatchElems] = useState([noMatchLI])
  // const [selectedMatchIdx, setSelectedMatchIdx] = useState(0)
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
        return (<Match
          first={i === 0}
          key={i}
          onClick={() => { setInput(match); setMatchElems([]) }}
        >{match}</Match>)
      }))
    }
  }
  return (
    <div className='wrapper'>
      <h1>Autocomplete</h1>
      <div className='control'>
        <input
          type='text'
          value={input}
          onChange={handleInput}
          className='input'
          onKeyDown={(e) => console.log(`event.key = ${e.key}`)}
        />
        <ul
          className='matches'
        >
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
