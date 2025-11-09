import React from 'react'
import cx from 'classnames'
import styles from '../../shared/h8k.module.css'

import { expandAndAddToSet} from './util'

function MealSchedule({data}) {
  const dates = new Set()
  data.forEach(guest => {
    expandAndAddToSet(guest.checkInDate, guest.checkOutDate, dates)
  })

  return (
    <div className={cx(styles.card,  styles['pt-30'], styles['pb-8'], styles['mt-20'])}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th style={{textAlign: 'left'}}>Customer Name(s) for Meals</th>
          </tr>
        </thead>
        <tbody data-testid="guest-list"> {
          Array.from(dates)
            .sort((a,b) => a > b ? 1 : b > a ? -1 : 0)
            .map((item, i) => (
              <tr key={i}>
                <td style={{textAlign: 'center'}}>{item}</td>
                <td>
                  <p> {
                    data.filter(guest => guest.checkInDate <= item && guest.checkOutDate >= item)
                      .map(guest => guest.guestName)
                      .join(', ')
                  }
                  </p>
                </td>
              </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default MealSchedule
