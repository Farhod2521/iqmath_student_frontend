import { request } from '@/services/api'
import Auth from '../../auth/Auth'
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
      className="bg-[#ecf2ff] w-full flex justify-center items-center"
      style={{
        height: 'calc(100vh - 60px)',
        backgroundImage: `url(${data?.image || '/images/bg-banner.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: loading ? 'blur(10px)' : 'none'
      }}
    >
      <div className="w-full h-full py-6 pb-24  flex justify-center items-center bg-black/30">
        <Auth />
      </div>
    </section>
  )
}

export default BannerHeader
