import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const getDigits = (value = '') => value.replace(/\D/g, '').slice(0, 9)

const formatPhone = (digits = '') => {
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 5)
  const part3 = digits.slice(5, 7)
  const part4 = digits.slice(7, 9)

  let result = ''

  if (part1) result += `(${part1}`
  if (part1.length === 2) result += ')'
  if (part2) result += ` ${part2}`
  if (part3) result += `-${part3}`
  if (part4) result += `-${part4}`

  return result
}

const countDigitsBeforeCursor = (value, cursorPos) => {
  return value.slice(0, cursorPos).replace(/\D/g, '').length
}

const InputPhone = React.forwardRef(({ className = '', onChange, onBlur, name, ...props }, ref) => {
  const { t } = useTranslation()
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(false)

  const displayValue = formatPhone(digits)

  const syncChange = (nextDigits) => {
    setDigits(nextDigits)

    if (nextDigits.length === 9 || nextDigits.length === 0) {
      setError(false)
    } else {
      setError(true)
    }

    onChange?.({
      target: {
        name,
        value: nextDigits
      }
    })
  }

  const handleChange = (e) => {
    const nextDigits = getDigits(e.target.value)
    syncChange(nextDigits)
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Backspace') return

    const input = e.target
    const cursorPos = input.selectionStart ?? 0

    if (cursorPos === 0 || digits.length === 0) return

    const digitsBefore = countDigitsBeforeCursor(displayValue, cursorPos)

    if (digitsBefore === 0) return

    const nextDigits = digits.slice(0, digitsBefore - 1) + digits.slice(digitsBefore)

    e.preventDefault()
    syncChange(nextDigits)
  }

  const handleBlur = (e) => {
    if (digits.length > 0 && digits.length < 9) {
      setError(true)
    } else {
      setError(false)
    }

    onBlur?.({
      target: {
        name,
        value: digits
      }
    })
  }

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center border rounded-[8px] px-3 py-2.5 ${error ? 'border-red-500' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.4)',
          borderColor: error ? '#ef4444' : 'rgba(255,255,255,0.7)'
        }}
      >
        <span className="text-sm font-medium text-white">+998</span>
        <div className="w-px h-5 mx-3" style={{ background: 'rgba(255,255,255,0.7)' }} />

        <input
          ref={ref}
          name={name}
          value={displayValue}
          type="tel"
          inputMode="numeric"
          placeholder="(__) ___-__-__"
          className={`w-full text-sm bg-transparent text-white placeholder-[#ffffee] border-none focus:outline-none ${className}`}
          style={{ border: 'none' }}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          {...props}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{t('phoneNumberMustBe9Digits')}</p>}
    </div>
  )
})

InputPhone.displayName = 'InputPhone'

export default InputPhone
