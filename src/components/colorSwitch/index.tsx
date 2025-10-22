// Challenge:  write a React component entirely in a single HTML file to do the following:
// * Change the background color between red, blue and green when clicked.
// * Make the button responsive so that when the screen is less than 500px the button's
// width spans the entire window.  If greater than 500px then the button can be default
// width.
//
//     This challenge was presented to me during an interview with Dun & Bradstreet on 2020-11-18
//
import { useState } from 'react'
import style from './changeBackgroundColor.module.css'
export default function ColorSwitch () {
  const [colorIdx, setColorIdx] = useState(0)
  const colors = ['red', 'blue', 'green']

  const toggleColor = () => {
    setColorIdx((colorIdx + 1) % 3)
  }

  return (
    <div className={style.container} style={{ backgroundColor: colors[colorIdx] }}>
      <button className={style.button} onClick={toggleColor}>Change background color</button>
    </div>
  )
}
