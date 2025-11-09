import React from 'react'
import cx from 'classnames'
import styles from '../../shared/h8k.module.css'

function MealSchedule() {
  return (
    <div className={cx(styles.card,  styles['pt-30'], styles['pb-8'], styles['mt-20'])}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name for Meals</th>
          </tr>
        </thead>
        <tbody data-testid="guest-list">
          <tr>
            <td style={{textAlign: 'center'}}>2022-11-09</td>
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
