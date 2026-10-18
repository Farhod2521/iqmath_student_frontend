import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Sayt statistikasi endi "Statistika" sahifasining o'zida (kartalar ostida) — eski manzil o'sha yerga yo'naltiriladi
function Index() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/dashboard/teacher/statistics')
  }, [router])
  return null
}

export default Index
