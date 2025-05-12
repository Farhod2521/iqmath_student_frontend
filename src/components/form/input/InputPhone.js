import React from 'react'

function InputPhone({ className = '', ...props }) {
  return (
    <div className="flex items-center border border-[#E9E9E9] rounded-md px-3 py-2">
      <span className="text-sm font-medium text-black">+998</span>
      <div className="w-px h-5 bg-[#59626B] mx-2" />
      <input
        className={`w-full text-sm bg-white text-black focus:outline-none ${className}`}
        type="tel"
        maxLength={9}
        {...props}
      />
    </div>
  )
}

export default InputPhone
