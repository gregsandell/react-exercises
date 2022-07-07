import React, { useState, useEffect } from 'react'
// import cs from 'classnames'
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
const Question = (props) => {
  // [
  //   { "question":"What is 2*(4+4)?","answers":["2","4","8","16"],"correct":3},
  //   { "question: "What is 9*9?", answers: ["18", "81", "80", "79"], correct: 1 }
  // ],
  const handleClick = (e) => {
    const reply = e.target.innerHTML
    // console.log(`<Question> handleClick got answer: ${reply}`)
    props.scorur(reply, props.query)
    props.advancer()
  }
  return (
    <div>
      <h1>{props.query.question}</h1>
      <ul>
        {
          props.query.answers.map((answer, i) => (
            <li
              key={`answer_${i}`}
              onClick={handleClick}
            >{answer}</li>)
          )
        }
      </ul>
    </div>
  )
}
Question.propTypes = {
  query: PropTypes.object,
  advancer: PropTypes.func,
  scorur: PropTypes.func
}
const ExamEnd = (props) => {
  const handleClick = () => {
    props.setSkore(0)
    props.setSkreenCount(1) // skip right to question 1
  }
  return (
    <div>
      <h2>You got a score of {props.score}</h2>
      <button onClick={handleClick}>Press to take test again</button>
    </div>
  )
}
ExamEnd.propTypes = {
  score: PropTypes.string,
  setSkreenCount: PropTypes.func,
  setSkore: PropTypes.func
}
export default function Quiz (props) {
  const [screenCount, setScreenCount] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    console.log(`<Quiz> current score is ${score}`)
  }, [score])

  const advanceScreen = () => setScreenCount(screenCount + 1)
  const scorer = (reply, query) => {
    const correct = query.answers[query.correct]
    console.log(`<Quiz> reply = ${reply}, correct = ${correct}`)
    setScore(reply === correct ? score + 1 : score)
  }

  switch (true) {
  case screenCount < 1:
    return (<StartScreen advancer={advanceScreen} />)
  case screenCount <= props.questions.length:
    return (<Question
      query={props.questions[screenCount - 1]}
      advancer={advanceScreen}
      scorur={scorer}
    />)
  case screenCount > props.questions.length: {
    const finalScore = ((score / props.questions.length) * 100).toFixed(1)
    return (<ExamEnd score={`${finalScore}%`} setSkreenCount={setScreenCount} setSkore={setScore} />)
  }
  default:
    return (<></>)
  }
}

Quiz.propTypes = {
  questions: PropTypes.array
}
