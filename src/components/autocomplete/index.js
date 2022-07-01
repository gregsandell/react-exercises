import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './autocomplete.css'
import cx from 'classnames'

const Match = (props) => {
  return (
    <li
      className={cx({ highlight: props.isActive })}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  )
}
Match.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}
Match.defaultProps = {
}

const Autocomplete = (props) => {
  const [input, setInput] = useState('')
  const noMatchLI = (<li className='no-match' key={0}>No matches</li>)
  const [matches, setMatches] = useState([])
  const [selectedMatchIdx, setSelectedMatchIdx] = useState(0)

  const handleInput = (e) => {
    e.preventDefault()
    const value = e.target.value.trim()
    setInput(value)
    setMatches([])
    setSelectedMatchIdx(0)
    if (value.length) {
      setMatches(props.suggestions.reduce((accum, sugg) => {
        if (sugg.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          accum.push(sugg)
        }
        return accum
      }, []))
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
          onKeyUp={(e) => {
            if (/ArrowUp/.test(e.key) && selectedMatchIdx > 0) {
              setSelectedMatchIdx(selectedMatchIdx - 1)
            }
            if (/ArrowDown/.test(e.key) && selectedMatchIdx < matches.length - 1) {
              setSelectedMatchIdx(selectedMatchIdx + 1)
            }
            if (/Enter/.test(e.key)) {
              setInput(matches[selectedMatchIdx]); setMatches([])
            }
          }}
        />
        <ul className='matches'>
          {matches.length > 0 && matches.map((match, i) => (
            <Match
              key={i}
              isActive={selectedMatchIdx === i}
              onClick={() => {
                setInput(match)
                setMatches([])
              }}
            >{match}</Match>
          ))}
          {matches.length === 0 && noMatchLI}
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
