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

import { useState, createRef } from 'react'
import './formValidationHtml5.css'

export default function FormValidationHtml5 () {
  const formRef = createRef()
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: ''
  })

  const validate = () => {
    return formRef.current.reportValidity()
  }
  function handleOnEmailChange (event) {
    const email = event.target.value
    setState({
      ...state,
      email
    })
  }

  /* eslint-disable no-control-regex */
  const emailPattern = '^.+@.+\\..+$'
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
    validate()
    console.log('submit')
  }

  return (
    <div className='main'>
      <form onSubmit={handleSubmit} ref={formRef}>
        <h1>Please enter your name and email</h1>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          {/* Note: the HTML5 type=email is pretty poor, it accepts "foo@bar" as a valid email! */}
          <input id='email' name='email' placeholder='Email (e.g. name@company.com)' required pattern={emailPattern} value={state.email} type='email' onChange={handleOnEmailChange} />
        </div>
        <div className='field'>
          <label>First name</label>
          <input value={state.firstName} name='firstName' placeholder='First name (no numbers)' required pattern={namePattern} type='text' onChange={handleOnFirstnameChange} />
        </div>
        <div className='field'>
          <label>Last name</label>
          <input value={state.lastName} name='lastName' placeholder='Last name (no numbers)' required pattern={namePattern} onChange={handleOnLastnameChange} />
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
