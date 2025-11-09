import React from 'react'
import './App.css'
// import 'h8k-components'
import GuestForm from './GuestForm'

const title = 'Meal Schedule'

const App = () => {
  return (
    <div className="App">
      {/*<h8k-navbar header={title}></h8k-navbar>*/}
      <GuestForm />
    </div>
  )
}

export default App
