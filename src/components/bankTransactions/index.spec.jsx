import React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BankTransactions from './index'
import txns from './fixtures'

describe('Banking Transactions', () => {
  afterEach(() => {
    cleanup()
  })

  const getTableResult = () => {
    const rows = screen.getAllByRole('row')
    let result = ''
    for (let i = 1; i < rows.length; i++) {
      result += rows[i].textContent
    }
    return result
  }

  const renderApp = () => render(<BankTransactions txns={txns} />)
  it('check default/initial state of the application', () => {
    renderApp()
    const result = getTableResult()
    expect(result).toEqual(
      '2019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.452019-12-01THE HACKERUNIVERSITY DES: CCD+ ID:0000232343Credit1000$12,234.452019-11-25HACKERBANK DES:DEBIT O ID: 0000987945787897987987Debit2450.45$12,234.452019-12-03HACKERBANK INC. DES:CCD+ ID: 33375894749Credit1985.4$12,234.452019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.452019-11-30CREDIT CARD PAYMENT ID: 222349083Debit1987$12,234.45'
    )
  })

  it('check filter by date', () => {
    renderApp()
    const input = screen.getByRole('search')
    // fireEvent.change(input, { value: "2019-11-29" }); // original HackerRank line, does not work
    fireEvent.change(input, {target: { value: '2019-11-29' }})  // line  corrected by candidate Greg Sandell
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)
    const result = getTableResult()
    expect(result).toEqual(
      '2019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.452019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.45'
    )
  })

  it('check sorting by amount', () => {
    renderApp()
    const sortButton = screen.getAllByRole('button')[1]
    fireEvent.click(sortButton)
    const result = getTableResult()
    expect(result).toEqual(
      '2019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.452019-12-01THE HACKERUNIVERSITY DES: CCD+ ID:0000232343Credit1000$12,234.452019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.452019-12-03HACKERBANK INC. DES:CCD+ ID: 33375894749Credit1985.4$12,234.452019-11-30CREDIT CARD PAYMENT ID: 222349083Debit1987$12,234.452019-11-25HACKERBANK DES:DEBIT O ID: 0000987945787897987987Debit2450.45$12,234.45'
    )
  })

  it('check filter by date and sorting by amount', () => {
    renderApp()

    const input = screen.getByRole('search')
    // fireEvent.change(input, { value: "2019-11-29" }); // original HackerRank line, does not work
    fireEvent.change(input, { target: { value: '2019-11-29' }})   // line  corrected by candidate Greg Sandell
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)
    const sortButton = screen.getAllByRole('button')[1]
    fireEvent.click(sortButton)
    const result = getTableResult()
    expect(result).toEqual(
      '2019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.452019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.45'
    )
  })

  it('check number of rows rendered', () => {
    renderApp()
    let numRows = screen.getAllByRole('row')
    expect(numRows.length).toEqual(7)
  })
})
