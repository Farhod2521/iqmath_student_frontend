import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Out() {
  const router = useRouter()
  const to = typeof router.query.to === 'string' ? router.query.to : ''

  useEffect(() => {
    if (!to) return
    window.location.href = to
  }, [to])

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md p-6 text-center bg-white border rounded-2xl">
        <div className="text-xl font-black">O‘yin ochilmoqda…</div>
        <div className="mt-2 text-sm text-gray-500">Tashqi saytga yo‘naltiryapmiz</div>
      </div>
    </div>
  )
}
