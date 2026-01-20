import { useRouter } from 'next/router'
import React from 'react'

const CTA = () => {
  const router = useRouter()
  const handleAuthRedirect = () => {
    router.push('/auth')
  }
  return (
    <section className="px-4 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="p-12 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl">
          <h2 className="mb-4 text-4xl font-bold text-white">Matematika Sayohatingizni Bugun Boshlang!</h2>
          <p className="mb-8 text-xl text-white/90">
            Minglab talabalar bilan birga IQmath platformasida o'z bilimlaringizni yangi bosqichga olib chiqing
          </p>
          <button
            onClick={handleAuthRedirect}
            className="px-10 py-4 text-lg font-bold text-blue-600 transition transform bg-white rounded-full hover:shadow-2xl hover:scale-105"
          >
            Ro'yxatdan O'tish
          </button>
          <div className="flex items-center justify-center gap-5 mt-6 text-sm text-white/80">
            <span>✓ Kredit karta talab qilinmaydi </span>
            <span>✓ Har qanday vaqtda bekor qilish mumkin</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
