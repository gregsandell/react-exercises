import React from 'react'
import styles from './h8k.module.css'
import cx from 'classnames'

function MealSchedule() {
  return (
    <div className={cx(styles.card, styles['w-40'], styles['pt-30'], styles['pb-8'], styles['mt-20'])}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name for Meals</th>
          </tr>
        </thead>
        <tbody data-testid="guest-list">
          <tr>
            <td>2022-11-09</td>
            <td>
              <p>John</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MealSchedule
