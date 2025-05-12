import React from 'react'

const InputText = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full border border-[#E9E9E9] bg-white rounded-md px-3 py-2 text-sm text-black focus:outline-none ${className}`}
    />
  )
})

export default InputText
