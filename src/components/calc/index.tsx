import { useState } from 'react'
import style from './calc.module.css'

const MAX = Number.MAX_SAFE_INTEGER
const numberWithCommas = (x:number|string) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')

interface CalcProps {
  initial: number
}
type CbType = (arg: string) => void

type KeyType = {
  cb: CbType,
  num: string
}

const Calc: React.FC<CalcProps> = ({initial}) => {
  const [readout, setReadout] = useState([initial])
  const numCB = (val: string): void => {
    const firstTime = readout.length === 1 && readout[0] === 0
    const arr = firstTime ? [] : [...readout]
    arr.push(Number(val))
    const value = Number(arr.join(''))
    if (value > MAX) {
      arr.pop()
    }
    setReadout(arr)
  }

  const delCB: () => void = () => {
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
          {/*<Delete cb={delCB} />*/}  {/* TODO fix this TypeScrip0t error */}
          <Key cb={numCB} num='0' />
          {/*<Accept cb={acceptCB} />*/}  {/* TODO fix this TypeScrip0t error */}
        </div>
      </div>
    </div>
  )
}

const Key: React.FC<KeyType> = ({cb, num}) => {
  const clicker = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent) {
      cb(e.currentTarget.textContent)
    }
  }
  return (
    <div className={style.key} onClick={clicker}>
      {num}
    </div>
  )
}

const Delete: React.FC<React.MouseEventHandler<HTMLDivElement>> = (cb) => {
  return (
    <div
      className={style.key}
      // type CbType = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

      onClick={cb}
      dangerouslySetInnerHTML={{ __html: '&#9003;' }}
    />
  )
}
const Accept: React.FC<() => void> = (cb) => {
  return (
    <div
      className={style.key}
      onClick={cb}
      dangerouslySetInnerHTML={{ __html: '&check;' }}
    />
  )
}
export default Calc
