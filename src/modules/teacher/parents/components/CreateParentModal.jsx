import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleModal from '@/components/modal/simple-modal'
import Input from '@/components/input'
import Button from '@/components/button'
import AutoCompleteSelect from './AutoCompleteSelect'
import toast from 'react-hot-toast'

const CreateParentModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  students = [], 
  isLoading = false,
  isLoadingStudents = false 
}) => {
  const { t } = useTranslation()
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    password: ''
  })
  const [selectedStudents, setSelectedStudents] = useState([])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      toast.error(t('fullNameRequired'))
      return false
    }
    
    if (!formData.phone.trim()) {
      toast.error(t('phoneRequired'))
      return false
    }
    
    // Check phone number length (should be 9 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 9) {
      toast.error(t('phoneNumberMustBe9Digits'))
      return false
    }
    
    if (!formData.password.trim()) {
      toast.error(t('passwordRequired'))
      return false
    }
    
    if (selectedStudents.length === 0) {
      toast.error(t('selectAtLeastOneStudent'))
      return false
    }

    return true
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    onSubmit({
      ...formData,
      students: selectedStudents
    })
  }

  const resetForm = () => {
    setFormData({
      full_name: '',
      phone: '',
      password: ''
    })
    setSelectedStudents([])
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <SimpleModal
      open={isOpen}
      onClose={handleClose}
      classname="modal-lg"
    >
      <div className="p-[24px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[18px] font-semibold">{t('createNewParent')}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {/* Full Name */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              {t('fullName')} <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder={t('enterFullName')}
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              {t('phone')} <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-[8px] px-3 py-[10px] focus-within:border-[#5D87FF] focus-within:ring-2 focus-within:ring-[#5D87FF]/20 transition-colors">
              <span className="text-sm font-medium text-gray-600">+998</span>
              <div className="w-px h-5 mx-3 bg-gray-300" />
              <input
                className="w-full text-sm bg-transparent text-gray-800 placeholder-gray-400 border-none focus:outline-none"
                type="tel"
                maxLength={9}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="901112233"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  handleInputChange('phone', value)
                }}
                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              {t('password')} <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              placeholder={t('enterPassword')}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>

          {/* Students Selection */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              {t('selectStudents')} <span className="text-red-500">*</span>
            </label>
            <AutoCompleteSelect
              options={students}
              selectedValues={selectedStudents}
              onSelectionChange={setSelectedStudents}
              placeholder={t('searchStudents')}
              loading={isLoadingStudents}
              noOptionsText={t('noStudentsFound')}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <Button
            onclick={handleClose}
            classname="bg-gray-300 hover:bg-gray-400 text-white"
            disabled={isLoading}
          >
            {t('cancel')}
          </Button>
          <Button       
            onclick={handleSubmit}
            disabled={isLoading}
            classname="bg-[#5D87FF] hover:bg-[#4570EA] text-white"
          >
            {isLoading ? t('creating') : t('create')}
          </Button>
        </div>
      </div>
    </SimpleModal>
  )
}

export default CreateParentModal
