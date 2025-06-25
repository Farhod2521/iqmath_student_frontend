import React from 'react'

const InputPhone = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div className="flex items-center border rounded-[8px] px-3 py-2.5" style={{background:'rgba(255,255,255,0.4)',borderColor:'rgba(255,255,255,0.7)'}}>
      <span className="text-sm font-medium text-white">+998</span>
      <div className="w-px h-5 mx-3" style={{background:'rgba(255,255,255,0.7)'}} />
      <input
        ref={ref}
        className={`w-full text-sm bg-transparent text-white placeholder-[#e5e5e5] border-none focus:outline-none ${className}`}
        style={{border:'none'}}
        type="tel"
        maxLength={9}
        inputMode="numeric"
        pattern="[0-9]*"
        onInput={e => e.target.value = e.target.value.replace(/\D/g, '')}
        {...props}
      />
    </div>
  )
})

export default InputPhone
