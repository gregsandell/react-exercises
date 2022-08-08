/**
 Challenge code for GoDaddy with Alex Chen 2022-08-04
 * 1. Input fields should be controlled
 * 2. Display error if first name and last name contain numbers
 * 3. Add button to submit form and display the inputted name and email
 * 4. Validate that the email is valid
 * 5. Fetch list of known email addresses from public/emails.json and verify that email does not exist
 *
 *
 */

import { useState } from 'react'
import './formValidationHtml5.css'

export default function FormValidationHtml5 () {
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: ''
  })

  function handleOnEmailChange (event) {
    const email = event.target.value
    setState({
      ...state,
      email
    })
  }

  /* eslint-disable no-control-regex */
  // const emailPattern = '(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
  const namePattern = '^([^0-9]*)$'
  // const namePattern = '^.*$'
  function handleOnFirstnameChange (event) {
    const firstName = event.target.value
    setState({
      ...state,
      firstName
    })
  }
  function handleOnLastnameChange (event) {
    const lastName = event.target.value
    setState({
      ...state,
      lastName
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <h1>Please enter your name and email</h1>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          {/* Note: the HTML5 type=email is pretty poor, it accepts "foo@bar" as a valid email! */}
          <input id='email' required value={state.email} type='email' onChange={handleOnEmailChange} />
        </div>
        <div className='field'>
          <label>First name</label>
          <input value={state.firstName} required pattern={namePattern} type='text' onChange={handleOnFirstnameChange} />
        </div>
        <div className='field'>
          <label>Last name</label>
          <input value={state.lastName} required pattern={namePattern} onChange={handleOnLastnameChange} />
        </div>
        <button type='submit'>Submit</button>
        <div>
          <div>Submitted Name: {state.firstName} {state.lastName}</div>
          <div>Submitted Email: {state.email}</div>
        </div>
      </form>
    </div>
  )
}
