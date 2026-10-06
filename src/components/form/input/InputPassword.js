import React, { useState } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { fieldBorder, fieldBox, fieldIcon, fieldInput } from '../field/fieldStyles'

const InputPassword = React.forwardRef(({ className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={`${fieldBox} ${fieldBorder}`}>
      <span className={fieldIcon}>
        <LockKeyhole size={20} />
      </span>
      <input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className={`${fieldInput} ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="flex h-full shrink-0 items-center px-4 text-[#64748B] hover:text-[#2563EB]"
        aria-label="toggle password"
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  )
})

InputPassword.displayName = 'InputPassword'

export default InputPassword
