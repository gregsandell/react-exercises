import { useState, createRef } from 'react'
import './formValidationHtml5.css'
import assert from 'assert'

type FormObject = {
  email: string,
  firstName: string,
  lastName: string
}
interface ValidationMessages {
  [key: string]: string; // This index signature allows any string to be used as a key
}


export default function FormValidationHtml5 () {
  const [state, setState] = useState<FormObject>({
    email: '',
    firstName: '',
    lastName: ''
  })
  const [submitted, setSubmitted] = useState<boolean>(false)
  const formRef = createRef<HTMLFormElement>()
  const emailRef = createRef<HTMLInputElement>()
  const formValidationMessages: ValidationMessages = {
    email: 'Please enter a complete email address, such as person@company.com',
    firstName: 'First Name may not contain any numbers',
    lastName: 'Last Name may not contain any numbers'
  }
  /* Note: don't use the native HTML5 type=email pattern validation, it accepts "foo@bar" as a valid email! */
  const emailPattern = '^.+@.+\\..+$'
  const namePattern = '^([^0-9]*)$'

  const validate = () => {
    let allValid = true
    assert(formRef.current !== null, 'ref is null')
    for (let i = 0; i < formRef.current.length; i++) { // Note: formRef.current.map() doesn't work
      const elem = formRef.current[i] as HTMLInputElement
      if (!elem.validity.valid && elem.validity.patternMismatch && elem.name in formValidationMessages) {
        elem.setCustomValidity(formValidationMessages[elem.name])
        allValid = false
      }
    }
    setSubmitted(allValid)

    return formRef.current.reportValidity()
  }
  function handleOnEmailChange (event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value
    setState({
      ...state,
      email
    })
    setSubmitted(false)
    if (!event.target.validity.patternMismatch) {
      const elem = emailRef.current as HTMLInputElement
      assert(elem !== null, 'ref is null')
      elem.setCustomValidity('') // string must be empty or it registers as invalid
    }
  }

  function handleOnFirstnameChange (event: React.ChangeEvent<HTMLInputElement>) {
    const firstName = event.target.value
    setState({
      ...state,
      firstName
    })
    setSubmitted(false)
    if (!event.target.validity.patternMismatch) {
      event.target.setCustomValidity('')
    }
  }
  function handleOnLastnameChange (event: React.ChangeEvent<HTMLInputElement>) {
    const lastName = event.target.value
    setState({
      ...state,
      lastName
    })
    setSubmitted(false)
    if (!event.target.validity.patternMismatch) {
      event.target.setCustomValidity('')
    }
  }

  const handleSubmit = (e: React.MouseEvent) => {
    setSubmitted(true)
    validate()
    e.preventDefault()
  }
  const handleCancel = () => {
    setState({
      email: '',
      firstName: '',
      lastName: ''
    })
    setSubmitted(false)
  }

  return (
    <div className='main'>
      <form ref={formRef}>
        <h1>Please enter your name and email</h1>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          <input id='email' name='email' ref={emailRef} placeholder='Email (e.g. name@company.com)' required pattern={emailPattern} value={state.email} type='email' onChange={handleOnEmailChange} />
        </div>
        <div className='field'>
          <label htmlFor='firstName'>First name</label>
          <input value={state.firstName} id='firstName' name='firstName' placeholder='First name (no numbers)' required pattern={namePattern} type='text' onChange={handleOnFirstnameChange} />
        </div>
        <div className='field'>
          <label htmlFor='firstName'>Last name</label>
          <input value={state.lastName} name='lastName' id='firstName' placeholder='Last name (no numbers)' required pattern={namePattern} onChange={handleOnLastnameChange} />
        </div>
        <input type='submit' onClick={handleSubmit} />
        <button id='cancel' onClick={handleCancel}>Cancel</button>
        {submitted && (<div>
          <div>Submitted Name: {state.firstName} {state.lastName}</div>
          <div>Submitted Email: {state.email}</div>
        </div>
        )}
      </form>
    </div>
  )
}
