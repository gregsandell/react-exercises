import React from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'
import MealSchedule from './MealSchedule'
import styles from '../../shared/h8k.module.css'
const defaultData = {
  guestName: '',
  checkInDate: '',
  checkOutDate: ''
}
function GuestForm() {
  const [data, setData] = React.useState([])
  const [name, setName] = React.useState('')
  const [checkIn, setCheckIn] = React.useState(dayjs().format('YYYY-MM-DD'))
  const [checkOut, setCheckOut] = React.useState(dayjs().format('YYYY-MM-DD'))
  const [calDate, setCalDate] = React.useState()
  return (
    <>
      <div className={cx(styles['layout-column'], styles['align-items-center'], styles['justify-content-start'])}>
        <section
          className={cx(styles['layout-row'], styles['align-items-center'], styles['justify-content-center'], styles['mt-30'])}>
          <input data-testid="input-guest-name" value={name} className={cx(styles.large, styles['mx-8'])}
            placeholder="Guest Name" onChange={(e) => setName(e.currentTarget.value)}/>
          <label htmlFor="checkInDate">Check In Date:</label>
          <input
            id="checkInDate"
            type="date"
            defaultValue={checkIn}
            onChange={(e) => {
              setCheckIn(e.currentTarget.value)
            }}
          />

          <label htmlFor="checkOutDate">Check Out Date:</label>
          <input
            id="checkOutDate"
            type="date"
            defaultValue={checkOut}
            onChange={(e) => {
              setCheckOut(e.currentTarget.value)
            }}
          />
          <button data-testid="add-button" type="submit" onClick={() => {
            setData([...data, {guestName: name, checkInDate: checkIn, checkOutDate: checkOut}])
            setName('')
            setCheckIn('')
            setCheckOut('')
          }}>Add to Menu
          </button>
        </section>
        <div>
          <MealSchedule data={data}/>
        </div>
      </div>
    </>
  )
}

export default GuestForm
