import React from 'react'

function InputText({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full border border-[#E9E9E9] bg-white rounded-md px-3 py-2 text-sm text-black focus:outline-none  ${className}`}
    />
  )
}

export default InputText
