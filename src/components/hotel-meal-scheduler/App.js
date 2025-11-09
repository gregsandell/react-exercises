import React from 'react'
import cx from 'classnames'
import styles from '../../shared/h8k.module.css'
import GuestForm from './GuestForm'

const title = 'Meal Schedule'

const App = () => {
  return (
    <div className={cx(styles['root-element'])}>
      <GuestForm />
    </div>
  )
}

export default App
