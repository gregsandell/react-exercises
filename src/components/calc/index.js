import { useState } from 'react'
import PropTypes from 'prop-types'
import style from './calc.module.css'

const MAX = Number.MAX_SAFE_INTEGER
const numberWithCommas = x => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')

export default function Calc ({ initial }) {
  const [readout, setReadout] = useState([initial])
  const numCB = (val) => {
    const firstTime = readout.length === 1 && readout[0] === 0
    const arr = firstTime ? [] : [...readout]
    arr.push(Number(val))
    const value = Number(arr.join(''))
    if (value > MAX) {
      arr.pop()
    }
    setReadout(arr)
  }
  const delCB = () => {
    const arr = [...readout]
    arr.pop()
    if (arr.length === 0) {
      arr.push(0)
    }
    setReadout(arr)
  }
  const acceptCB = () => {
    alert(`calc value is ${numberWithCommas(readout.join(''))}`)
  }

  return (
    <div>
      <div className={style.container}>
        <div className={style.readout}>{readout.join('')}</div>
        <div className={style.keypad}>
          <Key cb={numCB} num='7' />
          <Key cb={numCB} num='8' />
          <Key cb={numCB} num='9' />
          <Key cb={numCB} num='4' />
          <Key cb={numCB} num='5' />
          <Key cb={numCB} num='6' />
          <Key cb={numCB} num='3' />
          <Key cb={numCB} num='2' />
          <Key cb={numCB} num='1' />
          <Delete cb={delCB} />
          <Key cb={numCB} num='0' />
          <Accept cb={acceptCB} />
        </div>
      </div>
    </div>
  )
}
Calc.propTypes = {
  initial: PropTypes.number
}

const Key = ({ num, cb }) => {
  const clicker = (e) => {
    cb(e.target.textContent)
  }
  return (
    <div className={style.key} onClick={clicker}>
      {num}
    </div>
  )
}
Key.propTypes = {
  num: PropTypes.string,
  cb: PropTypes.func
}

const Delete = ({ cb }) => {
  return (
    <div
      className={style.key}
      onClick={cb}
      dangerouslySetInnerHTML={{ __html: '&#9003;' }}
    />
  )
}
Delete.propTypes = {
  cb: PropTypes.func
}
const Accept = ({ cb }) => {
  return (
    <div
      className={style.key}
      onClick={cb}
      dangerouslySetInnerHTML={{ __html: '&check;' }}
    />
  )
}
Accept.propTypes = {
  cb: PropTypes.func
}
