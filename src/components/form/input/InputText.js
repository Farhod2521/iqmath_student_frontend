import React from 'react'
import { UserRound } from 'lucide-react'
import { fieldBorder, fieldBox, fieldIcon, fieldInput } from '../field/fieldStyles'

const InputText = React.forwardRef(({ className = '', icon: Icon = UserRound, ...props }, ref) => {
  return (
    <div className={`${fieldBox} ${fieldBorder}`}>
      <span className={fieldIcon}>
        <Icon size={20} />
      </span>
      <input ref={ref} {...props} className={`${fieldInput} ${className}`} />
    </div>
  )
})

InputText.displayName = 'InputText'

export default InputText
