import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import ContentLoader from '@/components/loader/content-loader'
import toast from 'react-hot-toast'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import { Button, Card, Input } from '@heroui/react'
import { get } from 'lodash'

const ParentProfile = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    email: '',
    address: ''
  })

  // Phone verification states
  const [newPhone, setNewPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')

  const { mutate: profileUpdate } = usePostQuery({
    listKeyId: 'profile-update'
  })

  const { mutate: verifyPhoneChange, isLoading: isVerifyingPhone } = usePostQuery({
    listKeyId: 'verify-phone-change'
  })

  useEffect(() => {
    // Session dan ma'lumotlarni olish
    if (session) {
      setProfileData({
        full_name: session.user?.full_name || session.full_name || '',
        phone: session.user?.phone || session.phone || '',
        email: session.user?.email || '',
        address: session.user?.address || ''
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
      
      const updateData = {
        full_name: profileData.full_name,
        email: profileData.email,
        address: profileData.address
      }

      // Agar telefon raqam o'zgargan bo'lsa, parol ham kerak
      if (profileData.phone !== (session.user?.phone || session.phone || '')) {
        if (!currentPassword) {
          toast.error('Telefon raqamni o\'zgartirish uchun joriy parolni kiriting')
          return
        }
        updateData.phone = profileData.phone
        updateData.password = currentPassword
      }

      profileUpdate(
        {
          url: URLS.updateProfile,
          attributes: updateData,
          config: {
            headers: {
              'Authorization': `Bearer ${session?.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        },
        {
          onSuccess: (data) => {
            toast.success('Profil muvaffaqiyatli yangilandi')
            if (profileData.phone !== (session.user?.phone || session.phone || '')) {
              setShowPhoneVerification(true)
              setNewPhone(profileData.phone)
            }
          },
          onError: (error) => {
            toast.error(error.response?.data?.error || 'Profil yangilashda xatolik yuz berdi')
          }
        }
      )
      
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Profil yangilashda xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
  }

  const handlePhoneVerification = () => {
    if (!smsCode) {
      toast.error('SMS kodni kiriting')
      return
    }

    const verificationData = {
      sms_code: smsCode,
      new_phone: newPhone
    }

    verifyPhoneChange(
      {
        url: URLS.verifyPhoneChange,
        attributes: verificationData,
        config: {
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          toast.success('Telefon raqam muvaffaqiyatli tasdiqlandi')
          setSmsCode('')
          setNewPhone('')
          setShowPhoneVerification(false)
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || 'SMS kod noto\'g\'ri')
        }
      }
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <ContentLoader />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ma'lumotlarni yangilash</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">To'liq ism</label>
              <Input
                value={profileData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                placeholder="To'liq ismingizni kiriting"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefon raqam</label>
              <Input
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+998901234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@example.com"
                type="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Manzil</label>
              <Input
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Manzilingizni kiriting"
              />
            </div>

            {profileData.phone !== (session.user?.phone || session.phone || '') && (
              <div>
                <label className="block text-sm font-medium mb-2">Joriy parol (telefon raqamni o'zgartirish uchun)</label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Joriy parolingizni kiriting"
                />
              </div>
            )}

            <Button
              color="primary"
              onPress={handleSave}
              isLoading={saving}
              className="w-full"
            >
              Saqlash
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Profil ma'lumotlari</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">To'liq ism:</span>
              <p className="font-medium">{profileData.full_name || 'Kiritilmagan'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Telefon:</span>
              <p className="font-medium">{profileData.phone || 'Kiritilmagan'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Email:</span>
              <p className="font-medium">{profileData.email || 'Kiritilmagan'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Manzil:</span>
              <p className="font-medium">{profileData.address || 'Kiritilmagan'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Phone Verification Modal */}
      {showPhoneVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Telefon raqamni tasdiqlash</h3>
            <p className="text-gray-600 mb-4">
              {newPhone} raqamiga SMS kod yuborildi. Tasdiqlash uchun kodni kiriting.
            </p>
            
            <div className="mb-4">
              <Input
                type="text"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                placeholder="SMS kodni kiriting"
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                color="primary"
                onPress={handlePhoneVerification}
                isLoading={isVerifyingPhone}
                className="flex-1"
              >
                Tasdiqlash
              </Button>
              <Button
                variant="bordered"
                onPress={() => {
                  setShowPhoneVerification(false)
                  setSmsCode('')
                  setNewPhone('')
                }}
                className="flex-1"
              >
                Bekor qilish
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ParentProfile
