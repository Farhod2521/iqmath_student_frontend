import { useRouter } from 'next/router'
import React from 'react'

const CTA = () => {
  const router = useRouter()
  const handleAuthRedirect = () => {
    router.push('/auth')
  }
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Matematika Sayohatingizni Bugun Boshlang!</h2>
          <p className="text-xl text-white/90 mb-8">
            Minglab talabalar bilan birga IQmath platformasida o'z bilimlaringizni yangi bosqichga olib chiqing
          </p>
          <button
            onClick={handleAuthRedirect}
            className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Ro'yxatdan O'tish
          </button>
          <div className="mt-6 text-white/80 text-sm">
            ✓ Kredit karta talab qilinmaydi ✓ Har qanday vaqtda bekor qilish mumkin
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
