import Image from 'next/image'
import React from 'react'

function ActionCalculator({ setShowCalculator }) {
  return (
    <button onClick={() => setShowCalculator((prev) => !prev)} className="p-[6px]">
      <Image src="/icons/calculator.svg" alt="calculator" width={28} height={28} />
    </button>
  )
}

export default ActionCalculator
