import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './starRating.css'

const Star = (props) => {
  const handleClick = () => {
    const litStarzCopy = [...props.litStarz]
    for (let i = 0; i < litStarzCopy.length; i++) {
      litStarzCopy[i].clicked = i <= props.num
    }
    props.setLitStarz(litStarzCopy)
  }
  const setHover = (lit) => {
    const litStarzCopy = [...props.litStarz]
    litStarzCopy[props.num].hovered = lit
    for (let i = props.num; i >= 0; i--) {
      litStarzCopy[i].hovered = lit
    }
    props.setLitStarz(litStarzCopy)
  }
  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)
  const litStar = props.litStarz[props.num]
  return (
    <div
      className={cx({ star: true, on: litStar.clicked || litStar.hovered })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}
Star.propTypes = {
  num: PropTypes.number,
  litStarz: PropTypes.array,
  setLitStarz: PropTypes.func
}
export default function StarRatingPublished (props) {
  const unlitStar = { clicked: false, hovered: false }
  const [litStars, setLitStars] = useState([
    { ...unlitStar }, { ...unlitStar }, { ...unlitStar }, { ...unlitStar }, { ...unlitStar }
  ])

  return (
    <div id='container'>
      {
        [0, 1, 2, 3, 4].map((num) => (
          <Star
            key={`star_${num}`}
            num={num}
            litStarz={litStars}
            setLitStarz={(litStarz) => setLitStars(litStarz)}
          />
        ))
      }
    </div>
  )
}
