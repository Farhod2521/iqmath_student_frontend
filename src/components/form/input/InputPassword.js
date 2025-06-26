import Eye from '@/components/icons/eye/Eye'
import EyeOff from '@/components/icons/eye/EyeOff'
import React, { useState } from 'react'

const InputPassword = React.forwardRef(({ className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className={`w-full border rounded-[8px] px-3 py-2.5 text-sm text-white placeholder-[#e5e5e5] focus:outline-none ${className}`}
        style={{background:'rgba(255,255,255,0.4)',borderColor:'rgba(255,255,255,0.7)'}}
        {...props}
      />
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-0 bottom-0 right-3 cursor-pointer flex items-center"
      >
        {showPassword ? <Eye width={24} height={24} /> : <EyeOff width={24} height={24} />}
      </div>
    </div>
  )
})

export default InputPassword
