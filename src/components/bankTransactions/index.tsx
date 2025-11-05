import React, { useState } from 'react'
import { BankRecord } from './types'

function BankTransactions({ txns }: { txns: BankRecord[] }) {
  const [dateToFilter, setDateToFilter] = useState<string>('')
  const [bankdate, setBankdate] = useState<string>('')
  const [livedata, setLivedata] = useState<BankRecord[]>(txns)

  const sort = () => {
    const sorted: BankRecord[] = [...livedata].sort((a,b) => a.amount > b.amount ? 1 : b.amount > a.amount ? -1 : 0)
    setLivedata(sorted)
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <label className="mr-10">Transaction Date</label>
        <input
          id="date"
          type="date"
          defaultValue={dateToFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDateToFilter(e.currentTarget.value)
          }}
          role="search"
        />
        <button className="small" onClick={() => setBankdate(dateToFilter)}>Filter</button>
      </section>

      <div className="card mt-50">
        <table className="table">
          <thead>
            <tr className="table">
              <th className="table-header">Date</th>
              <th className="table-header">Description</th>
              <th className="table-header">Type</th>
              <th className="table-header">
                <span id="amount" onClick={ sort } role="button">
                  Amount ($)
                </span>
              </th>
              <th className="table-header">Available Balance</th>
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
