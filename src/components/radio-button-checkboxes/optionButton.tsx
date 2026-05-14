import { useEffect, useState } from 'react'
import {
  UserOption,
  type UserOptionValueType,
} from './common-types'
import homeStyles from './Home.module.css'
import radioStyles from './OptionButton.module.css'

type Copy = {
  title: string
  description: string
}
const copy: Record<UserOptionValueType, Copy> = {
  [UserOption.KEEP]: {
    title: 'Keep My Subscription',
    description:
      'Your plan is set to end at the end of your current billing period. You’ll have access until then.'
  },
  [UserOption.CANCEL]: {
    title: 'Cancel & Request Refund',
    description:
      'Cancel your plan now and receive a refund to your original payment method. You will receive a confirmation email when the refund has been sent.'
  }
}


export function OptionButton({
  option_choice,
  enabled = false,
  setSubmitEnabled,
}: {
  option_choice: UserOptionValueType
  enabled: boolean,
  setSubmitEnabled: (enabled: boolean) => void
}) {
  const [checked, setChecked] = useState<boolean>(enabled)

  // When route (or parent) changes which row is active, `enabled` updates but useState
  // only uses the initial value on first mount — sync so /keep ↔ /cancel updates without hard refresh.
  useEffect(() => {
    setChecked(enabled)
  }, [enabled])

  // Disable the submit button if the user unchecks the option they are allowed to choose
  // (e.g. unchecking Keep when on /keep route).  Re-enable if they check it again.
  useEffect(() => {
    setSubmitEnabled(checked)
  }, [checked])




  return (
    <div className={homeStyles.options}>
      <label className={homeStyles.option}>
        <input type="checkbox"
               className={radioStyles.radioLook}
               disabled={!enabled }
               checked={checked}
               onChange={() => setChecked((previousValue: boolean) => !previousValue)}/>
        <span className={homeStyles.optionContent}>
          <strong>{copy[option_choice].title}</strong>
          <span>{copy[option_choice].description}</span>
        </span>
      </label>
    </div>
  )
}
