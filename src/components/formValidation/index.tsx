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

import { useState, useEffect } from 'react'
import style from './formValidation.module.css'

type FormObject = {
  email: string,
  firstName: string,
  lastName: string
}
export default function FormValidation () {
  const [state, setState] = useState<FormObject>({
    email: '',
    firstName: '',
    lastName: ''
  })
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [errorMesg, setErrorMesg] = useState<string>('')
  const [allValid, setAllValid] = useState<boolean>(false)

  useEffect(() => {
    setAllValid(state.email.length > 0 && emailValid(state.email) && state.firstName.length > 0 && nameValid(state.firstName) && state.lastName.length > 0 && nameValid(state.lastName))
  }, [state])

  function handleOnEmailChange (event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMesg('')
    setSubmitted(false)
    const email = event.currentTarget.value
    setState({
      ...state,
      email
    })
    if (!emailValid(email)) {
      setErrorMesg('Keep typing...invalid email so far!')
    }
  }

  const emailValid = (email: string) => /^.+@.+\..+$/.test(email)
  const nameValid = (name: string) => !/\d/.test(name)
  function handleOnFirstnameChange (event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMesg('')
    const firstName = event.target.value
    setState({
      ...state,
      firstName
    })
    if (!nameValid(firstName)) {
      setErrorMesg('Number not allowed in first or last name')
    }
  }
  function handleOnLastnameChange (event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMesg('')
    setSubmitted(false)
    const lastName = event.target.value
    setState({
      ...state,
      lastName
    })
    if (!nameValid(lastName)) {
      setErrorMesg('Number not allowed in first or last name')
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div className={style.main}>
      <h1>Please enter your name and email</h1>
      <div>
        <label>Email</label>
        <input value={state.email} type='email' onChange={handleOnEmailChange} />
      </div>
      <div>
        <label>First name</label>
        <input value={state.firstName} onChange={handleOnFirstnameChange} />
      </div>
      <div>
        <label>Last name</label>
        <input value={state.lastName} onChange={handleOnLastnameChange} />
      </div>
      {errorMesg && (<div className={style.error}>{errorMesg}</div>)}
      <button type='submit' disabled={!allValid} onClick={handleSubmit}>Submit</button>
      {submitted && (
        <div>
          <div>Submitted Name: {state.firstName} {state.lastName}</div>
          <div>Submitted Email: {state.email}</div>
        </div>
      )}
    </div>
  )
}
