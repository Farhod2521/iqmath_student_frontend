import { request } from '@/services/api'
import Auth from '../../auth/Auth'
import AuthCard from '../../auth/AuthCard'
import { URLS } from '@/constants/url'
import { useEffect, useState } from 'react'

function BannerHeader() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    request
      .get(URLS.systemBanner)
      .then((res) => {
        setData(res.data[0] || {})
      })
      .catch((error) => {
        console.error('Error fetching social links:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <section
      className="bg-[#ecf2ff] w-full  flex justify-center items-center"
      style={{
        height: 'calc(100vh - 60px)',
        backgroundImage: `url(${data?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: loading ? 'blur(10px)' : 'none'
      }}
    >
      <div className="w-full h-full overflow-y-auto bg-[#0F172A]/40">
        <div className="flex min-h-full items-center justify-center px-3 py-6">
          <AuthCard>
            <Auth />
          </AuthCard>
        </div>
      </div>
    </section>
  )
}

export default BannerHeader
