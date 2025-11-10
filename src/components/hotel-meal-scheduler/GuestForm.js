import React from 'react'
import { useForm } from 'react-hook-form'
import cx from 'classnames'
import dayjs from 'dayjs'
import MealSchedule from './MealSchedule'
import styles from '../../shared/h8k.module.css'
import style from '../formValidation-hooks-with-register/formValidationHooks.module.css'
const defaultData = {
  guestName: '',
  checkInDate: dayjs().format('YYYY-MM-DD'),
  checkOutDate: dayjs().format('YYYY-MM-DD')
}
const nameValid = /^([^0-9]*)$/

function GuestForm() {
  const [data, setData] = React.useState([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultData,
  })

  const onSubmit = (ddata) => {
    setData([...data, {guestName: ddata.name, checkInDate: ddata.checkInDate, checkOutDate: ddata.checkOutDate}])
    reset()
  }

  return (
    <>
      <div className={cx(styles['layout-column'], styles['align-items-center'], styles['justify-content-start'])}>
        <section
          className={cx(styles['layout-row'], styles['align-items-center'], styles['justify-content-center'], styles['mt-30'])}
        >
          <form onSubmit={handleSubmit(onSubmit)}>

            {/*<input data-testid="input-guest-name" value={name} className={cx(styles.large, styles['mx-8'])}*/}
            {/*  placeholder="Guest Name" onChange={(e) => setName(e.currentTarget.value)}/>*/}
            <input placeholder="Enter your name" {...register('name', {required: true, pattern: nameValid})} />

            <label htmlFor="checkInDate">Check In Date:</label>
            <input type='date' {...register('checkInDate', {required: true})} />

            <label htmlFor="checkOut">Check Out Date:</label>
            <input type='date' {...register('checkOutDate', {required: true})} />

            <button type='submit'>Add to Menu</button>
            {errors.name?.type === 'required' && <div className={style.err}>This field is required</div>}
            {errors.name?.type === 'pattern' && <div className={style.err}>The name cannot include numbers</div>}

          </form>
        </section>
        <div>
          <MealSchedule data={data}/>
        </div>
      </div>
    </>
  )
}

export default GuestForm
