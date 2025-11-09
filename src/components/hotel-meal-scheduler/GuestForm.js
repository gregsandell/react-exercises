import React from 'react'
import cx from 'classnames'
import MealSchedule from './MealSchedule'
import styles from '../../shared/h8k.module.css'
function GuestForm() {

  return (
    <>
      <div className={cx(styles['layout-column'], styles['align-items-center'], styles['justify-content-start'])}>
        <section className={cx(styles['layout-row'], styles['align-items-center'], styles['justify-content-center'], styles['mt-30'])}>
          <input data-testid="input-guest-name" value={'Name'} className={cx(styles.large, styles['mx-8'])}
            placeholder="Guest Name"/>
          <input data-testid="input-checkin-date" value={'Check In'} className={cx(styles.large, styles['mx-8'])}
            placeholder="Check in Date"/>
          <input data-testid="input-checkout-date" value={'Check Out'} className={cx(styles.large, styles['mx-8'])}
            placeholder="Check out Date"/>
          <button data-testid="add-button">Add to Menu</button>
        </section>
        <MealSchedule />
      </div>
    </>
  )
}

export default GuestForm
