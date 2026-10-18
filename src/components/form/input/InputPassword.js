import React, { useRef, useState } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useAuthMascot } from '@/home/components/auth/AuthMascot'
import { fieldBorder, fieldBox, fieldIcon, fieldInput } from '../field/fieldStyles'

const InputPassword = React.forwardRef(({ className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)
  const setMascot = useAuthMascot((state) => state.setMode)
  const resetMascot = useAuthMascot((state) => state.reset)

  // Tashqi ref (react-hook-form) va ichki ref birga ishlaydi
  const setRefs = (node) => {
    inputRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  const toggle = () => {
    const next = !showPassword
    setShowPassword(next)
    // Maskot: parol ko'rinsa mo'ralaydi, yashirilsa ko'zini yopadi
    setMascot(next ? 'peek' : 'hide')
    inputRef.current?.focus()
  }

  return (
    <div
      ref={wrapperRef}
      className={`${fieldBox} ${fieldBorder}`}
      onFocus={() => setMascot(showPassword ? 'peek' : 'hide')}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget)) resetMascot()
      }}
    >
      <span className={fieldIcon}>
        <LockKeyhole size={20} />
      </span>
      <input
        ref={setRefs}
        type={showPassword ? 'text' : 'password'}
        className={`${fieldInput} ${className}`}
        {...props}
      />
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()} // fokus inputda qoladi
        onClick={toggle}
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
