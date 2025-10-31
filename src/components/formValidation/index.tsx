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

export const TESTIDS: Record<string, string> = {
  ERROR_MESG: 'errorMesg',
  EMAIL_INPUT: 'emailInput',
  FIRST_NAME_INPUT: 'firstNameInput',
  LAST_NAME_INPUT: 'lastNameInput',
  SUBMIT_BUTTON: 'submitButton',
  SUBMIT_OUTPUT: 'submitOutput'
}
export const ERR_MESGS: Record<string, string> = {
  BAD_EMAIL: 'Keep typing...invalid email so far!',
  BAD_NAME: 'Number not allowed in first or last name'
}

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
      setErrorMesg(ERR_MESGS.BAD_EMAIL)
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
      setErrorMesg(ERR_MESGS.BAD_NAME)
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
      setErrorMesg(ERR_MESGS.BAD_NAME)
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
        <input value={state.email} type='email' onChange={handleOnEmailChange} data-testid={TESTIDS.EMAIL_INPUT}/>
      </div>
      <div>
        <label>First name</label>
        <input value={state.firstName} onChange={handleOnFirstnameChange} data-testid={TESTIDS.FIRST_NAME_INPUT}/>
      </div>
      <div>
        <label>Last name</label>
        <input value={state.lastName} onChange={handleOnLastnameChange} data-testid={TESTIDS.LAST_NAME_INPUT}/>
      </div>
      {errorMesg && (<div className={style.error} data-testid={TESTIDS.ERROR_MESG}>{errorMesg}</div>)}
      <button type='submit' disabled={!allValid} onClick={handleSubmit} data-testid={TESTIDS.SUBMIT_BUTTON}>Submit</button>
      {submitted && (
        <div data-testid={TESTIDS.SUBMIT_OUTPUT}>
          <div>Submitted Name: {state.firstName} {state.lastName}</div>
          <div>Submitted Email: {state.email}</div>
        </div>
      )}
    </div>
  )
}
