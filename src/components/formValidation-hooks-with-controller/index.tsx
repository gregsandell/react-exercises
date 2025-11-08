import React, {useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import style from '../formValidation-hooks-with-register/formValidationHooks.module.css'

type FormValues = Partial<Record<'firstName' | 'lastName' | 'email', string>>;
const emptyForm: FormValues = { firstName: '', lastName: '', email: ''}
export default function ContactForm() {
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const [submittedForm, setSubmittedForm] = useState<FormValues>(emptyForm)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: emptyForm,
  })

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const nameValid = /^([^0-9]*)$/

  const onSubmit = (data: FormValues) => {
    setSubmitted(true)
    setSubmittedForm(data)
  }
  const handleCancel = () => {
    reset()
    setSubmitted(false)
  }

  const fieldStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '4px',
  }

  const labelStyle: React.CSSProperties = {
    fontWeight: 'bold',
    marginBottom: '4px',
    display: 'block',
  }

  const errorStyle: React.CSSProperties = {
    color: 'red',
    fontSize: '0.9em',
    marginTop: '4px',
  }

  const formContainerStyle: React.CSSProperties = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: '#fafafa',
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formContainerStyle}>
      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>First Name</label>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: 'First name is required',
            pattern: {
              value: nameValid,
              message: 'First name cannot contain numbers',
            }
          }}
          render={({field}) => <input {...field} style={fieldStyle}/>}
        />
        {errors.firstName && (
          <p style={errorStyle}>{errors.firstName.message}</p>
        )}
      </div>

      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Last Name</label>
        <Controller
          name="lastName"
          control={control}
          rules={{
            required: 'Last name is required',
            pattern: {
              value: nameValid,
              message: 'Last name cannot contain numbers',
            },
          }}
          render={({field}) => <input {...field} style={fieldStyle}/>}
        />
        {errors.lastName && (
          <p style={errorStyle}>{errors.lastName.message}</p>
        )}
      </div>

      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Email</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: emailValid,
              message: 'Invalid email address',
            },
          }}
          render={({field}) => (
            <input {...field} type="email" style={fieldStyle}/>
          )}
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <button type="submit" style={buttonStyle}>
          Submit
      </button>
      <button id={style.cancel} type="button" onClick={handleCancel}>Cancel</button>

      {submitted && (<div>
        <div>Submitted Name: {submittedForm.firstName} {submittedForm.lastName}</div>
        <div>Submitted Email: {submittedForm.email}</div>
      </div>
      )}
    </form>
  )
}
