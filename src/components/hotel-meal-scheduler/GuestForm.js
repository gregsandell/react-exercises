import React from 'react'
import cx from 'classnames'
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
  const [checkIn, setCheckIn] = React.useState('')
  const [checkOut, setCheckOut] = React.useState('')
  return (
    <>
      <div className={cx(styles['layout-column'], styles['align-items-center'], styles['justify-content-start'])}>
        <section className={cx(styles['layout-row'], styles['align-items-center'], styles['justify-content-center'], styles['mt-30'])}>
          <input data-testid="input-guest-name" value={name} className={cx(styles.large, styles['mx-8'])}
            placeholder="Guest Name" onChange={(e) => setName(e.currentTarget.value)}/>
          <input data-testid="input-checkin-date" value={checkIn} className={cx(styles.large, styles['mx-8'])}
            placeholder="Check in Date" onChange={(e) => setCheckIn(e.currentTarget.value)}/>
          <input data-testid="input-checkout-date" value={checkOut} className={cx(styles.large, styles['mx-8'])}
            placeholder="Check out Date" onChange={(e) => setCheckOut(e.currentTarget.value)}/>
          <button data-testid="add-button" type="submit" onClick={() => {
            setData([...data, {guestName: name, checkInDate: checkIn, checkOutDate: checkOut}])
            setName('')
            setCheckIn('')
            setCheckOut('')
          }}>Add to Menu</button>
        </section>
        <div>
          <MealSchedule data={data} />
        </div>
      </div>
    </>
  )
}

export default GuestForm
