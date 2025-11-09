import React, { useState } from 'react'
import cx from 'classnames'
import { BankRecord } from './types'
import styles from '../../shared/h8k.module.css'

function BankTransactions({ txns }: { txns: BankRecord[] }) {
  const [dateToFilter, setDateToFilter] = useState<string>('')
  const [bankdate, setBankdate] = useState<string>('')
  const [livedata, setLivedata] = useState<BankRecord[]>(txns)

  const sort = () => {
    const sorted: BankRecord[] = [...livedata].sort((a,b) => a.amount > b.amount ? 1 : b.amount > a.amount ? -1 : 0)
    setLivedata(sorted)
  }

  return (
    <div className={cx(styles['root-element'], styles['layout-column'], styles['align-items-center'], styles['mt-50'])}>
      <section className={cx(styles['layout-row'], styles['align-items-center'], styles['justify-content-center'])}>
        <label className={cx(styles['mr-10'])}>Transaction Date</label>
        <input
          id="date"
          type="date"
          defaultValue={dateToFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDateToFilter(e.currentTarget.value)
          }}
          role="search"
        />
        <button className={styles.small} onClick={() => setBankdate(dateToFilter)}>Filter</button>
      </section>

      <div className={cx(styles.card, styles['mt-50'])}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.table}>
              <th className={styles['table-header']}>Date</th>
              <th className={styles['table-header']}>Description</th>
              <th className={styles['table-header']}>Type</th>
              <th className={styles['table-header']}>
                <span id="amount" onClick={ sort } role="button">
                  Amount ($)
                </span>
              </th>
              <th className={styles['table-header']}>Available Balance</th>
            </tr>
          </thead>
          <tbody>{
            livedata.filter((item: BankRecord) => bankdate === '' || item.date === bankdate)
              .map((item: BankRecord, i: number) => {
                return (
                  <tr key={i}>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>{item.type === 1 ? 'Debit' : 'Credit'}</td>
                    <td>{item.amount}</td>
                    <td>{item.balance}</td>
                  </tr>
                )
              })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BankTransactions
