import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import ContentLoader from '@/components/loader/content-loader'
import toast from 'react-hot-toast'


const ParentProfile = () => {
  const { t } = useTranslation()
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    email: '',
    children_count: 0
  })

  useEffect(() => {
    // Session dan ma'lumotlarni olish
    if (session) {
      setProfileData({
        full_name: session.user?.full_name || session.full_name || '',
        phone: session.user?.phone || session.phone || '',
        email: session.user?.email || '',
        children_count: session.children?.length || 0
      })
    }
    setLoading(false)
  }, [session])

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // TODO: API ga yuborisha
      // const response = await request.put('/api/v1/auth/parent/profile-update/', profileData)
      
      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(t('profileUpdatedSuccessfully'))
      
      // Session ni yangilash
      await update({
        ...session,
        full_name: profileData.full_name,
        phone: profileData.phone
      })
      
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error(t('profileUpdateError'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <ContentLoader />
      </div>
    )
  }

  return (
    <div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      

      </div>

    </div>
  )
}

export default ParentProfile
