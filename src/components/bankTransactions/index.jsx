import React, { useState } from 'react'

function BankTransactions({ txns }) {
  const [dateToFilter, setDateToFilter] = useState('')
  const [bankdate, setBankdate] = useState('')
  const [livedata, setLivedata] = useState(txns)
  const sort = () => {
    const sorted = [...livedata].sort((a,b) => a.amount > b.amount ? 1 : b.amount > a.amount ? -1 : 0)
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
          onChange={(e) => {
            setDateToFilter(e.currentTarget.value)
          }}
          role="search"
        />
        <button className="small" onClick={(e) => setBankdate(dateToFilter)}>Filter</button>
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
            livedata.filter((item) => bankdate === '' || item.date === bankdate)
              .map((item, i) => {
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
