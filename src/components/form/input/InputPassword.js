import Image from 'next/image'
import React, { useState } from 'react'

const InputPassword = React.forwardRef(({ className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className={`w-full border border-[#E9E9E9] bg-white rounded-md px-3 py-2 text-sm text-black focus:outline-none ${className}`}
        {...props}
      />
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-0 bottom-0 right-3 cursor-pointer flex items-center"
      >
        <Image
          src={showPassword ? '/icons/eye.svg' : '/icons/eye-off.svg'}
          alt="toggle visibility"
          width={24}
          height={24}
        />
      </div>
    </div>
  )
})

export default InputPassword
