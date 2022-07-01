import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './autocomplete.css'
// import classnames from 'classnames'

// the exported component can be either a function or a class

export default function Autocomplete (props) {
  const [input, setInput] = useState('')
  const noMatchLI = <li key={0}>No matches</li>
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
          console.log(`${value} match with ${sugg}`)
          accum.push(sugg)
        }
        return accum
      }, [])
      setMatchElems(matches.map((match, i) => (<li className='match' key={i}>{match}</li>)))
    }
    console.log(`accum has ${matches.length} matches`)
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
