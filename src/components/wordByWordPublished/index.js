import React, { useState, useEffect } from 'react'
import './wordByWordPublished.css'

const WordByWordPublished = () => {
  const [input, setInput] = useState('')
  const [text, setText] = useState([])
  const [word, setWord] = useState(1) // a pointer to the tokens in 'text'

  const onSubmit = (e) => {
    e.preventDefault()
    const wordsArray = input.split(' ')
    if (wordsArray.length <= 1) {
      alert('Enter more than one word.')
    } else {
      setText(wordsArray)
      setWord(1)
      setInput('')
    }
  }

  /*
      When criteria is met (two or more words in text and there are words remaining), it will set a timer
      to update the 'word' state.  When that executes, the state change to 'word' causes another
      invocation of the useEffect(), and the process repeats.
   */
  useEffect(() => {
    if (text && word < text.length) {
      const time = setTimeout(() => setWord(word + 1), 500)
      return () => clearTimeout(time)
    }
  }, [text, word])

  return (
    <div id='container'>
      <form onSubmit={onSubmit}>
        <input
          required
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      {/* On each change to 'word' state variable, rerender the output text up to */}
      {/* the token pointed at by the 'word' index. */}
      <div id='typewriter'>
        {text.slice(0, word).map((item, i) => (
          <p className='word' key={`word_${i}`}>{item}</p>
        ))}
      </div>
    </div>
  )
}

export default WordByWordPublished
