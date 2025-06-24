import React from 'react'

const InputText = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full border rounded-[8px] px-3 py-2.5  text-sm text-white placeholder-[#e5e5e5] focus:outline-none ${className}`}
      style={{background:'rgba(255,255,255,0.4)',borderColor:'rgba(255,255,255,0.7)'}}
    />
  )
})

export default InputText;