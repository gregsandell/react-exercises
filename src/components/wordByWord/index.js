import React, { useState, useEffect, useRef } from 'react'
import './wordByWord.css'
export default function WordByWord () {
  const [inputText, setInputText] = useState('')
  const [queuedTokens, setQueuedTokens] = useState([])
  const typewriterRef = useRef(null)
  let myInterval = null
  const wordRate = 500

  useEffect(() => {
    if (queuedTokens.length > 0 && !myInterval) {
      myInterval = setInterval(() => {
        const div = document.createElement('div')
        div.classList.add('word')
        const textnode = document.createTextNode(queuedTokens.splice(0, 1)[0])
        div.appendChild(textnode)
        typewriterRef.current.appendChild(div)

        if (queuedTokens.length === 0) {
          clearInterval(myInterval)
        }
      }, wordRate)
    }
    return () => clearInterval(myInterval)
  }, [queuedTokens])

  const handleChangedInput = (e) => {
    setInputText(e.target.value)
    if (/.*\s$/.test(e.target.value)) {
      if (myInterval) {
        clearInterval(myInterval)
      }
      setQueuedTokens(e.target.value.split(' '))
      while (typewriterRef.current.firstChild) {
        typewriterRef.current.removeChild(typewriterRef.current.firstChild)
      }
    }
  }
  return (
    <div id='container'>
      <input type='text' value={inputText} onChange={handleChangedInput} />
      <div id='typewriter' ref={typewriterRef} />
    </div>
  )
}
