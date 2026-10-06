import React from 'react'
import { ArrowRight } from 'lucide-react'

/** Formalardagi asosiy ko'k tugma (o'ngda strelka bo'lagi bilan) */
export default function AuthButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`relative flex h-[54px] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D5BF0] pr-14 pl-4 text-[16px] font-semibold text-white shadow-[0_14px_28px_-14px_rgba(37,99,235,0.95)] transition hover:brightness-105 disabled:opacity-70 ${className}`}
    >
      <span className="flex items-center gap-2">{children}</span>
      <span className="absolute inset-y-0 right-0 flex w-14 items-center justify-center bg-[#1E4FD8]">
        <ArrowRight size={20} />
      </span>
    </button>
  )
}
