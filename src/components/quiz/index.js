import React, { useState } from 'react'
import PropTypes from 'prop-types'

const StartScreen = (props) => {
  const handleClick = () => { props.advancer() }
  return (
    <button onClick={handleClick}>Start New Quiz Session</button>
  )
}
StartScreen.propTypes = {
  advancer: PropTypes.func
}
// TODO Scramble the order of questions on each test run
// TODO Add forward and back buttons, allowing them to change their answer
export default function Quiz (props) {
  const [screenCount, setScreenCount] = useState(0)
  const [score, setScore] = useState(0)

  const advanceScreen = () => {
    // console.log(`advancing screenCount from ${screenCount} to ${screenCount + 1}`)
    setScreenCount(screenCount + 1)
  }
  const scorer = (reply, query) => {
    const correct = query.answers[query.correct]
    // console.log(`<Quiz> reply = ${reply}, correct = ${correct}`)
    setScore(reply === correct ? score + 1 : score)
  }
  const handleClick = (e, i) => {
    const reply = e.target.innerHTML
    // console.log(`<Question> handleClick got answer: ${reply}`)
    // console.log(`<Quiz> handleClick() reply = ${reply}, index = ${i}, query = ${JSON.stringify(props.questions[i])}`)
    scorer(reply, props.questions[i])
    advanceScreen()
  }
  switch (true) {
  case screenCount < 1:
    return (<StartScreen advancer={advanceScreen} />)
  case screenCount <= props.questions.length: {
    const queryIdx = screenCount - 1
    const query = props.questions[queryIdx]

    return (
      <div>
        <h1>{query.question}</h1>
        <ul>
          {
            query.answers.map((answer, i) => (
              <li
                key={`answer_${i}`}
                onClick={(e) => handleClick(e, queryIdx)}
              >{answer}</li>)
            )
          }
        </ul>
      </div>
    )
  }
  case screenCount > props.questions.length: {
    const finalScore = ((score / props.questions.length) * 100).toFixed(1)
    // return (<ExamEnd score={`${finalScore}%`} setSkreenCount={setScreenCount} setSkore={setScore} />)
    const handleClick = () => {
      setScore(0)
      setScreenCount(1) // skip right to question 1
    }
    return (
      <div>
        <h2>You got a score of {finalScore}</h2>
        <button onClick={handleClick}>Press to take test again</button>
      </div>
    )
  }
  default:
    return (<></>)
  }
}

Quiz.propTypes = {
  questions: PropTypes.array
}
