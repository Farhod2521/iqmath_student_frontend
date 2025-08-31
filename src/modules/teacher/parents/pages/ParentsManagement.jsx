import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/button'
import toast from 'react-hot-toast'
import { request } from '@/services/api'

// Components
import CreateParentModal from '../components/CreateParentModal'


const ParentsManagement = () => {
  const { t } = useTranslation()

  const [students, setStudents] = useState([])
  const [isLoadingStudents, setIsLoadingStudents] = useState(false)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  
  const fetchStudents = async () => {
    try {
      setIsLoadingStudents(true)
      
      const response = await request.get('/api/v1/auth/student/student_list/', {
        params: {
          page: 1,
          size: 100
        }
      })
      
      const studentsData = response.data.results || []
      setStudents(studentsData)
      
    } catch (error) {
      console.error('Error fetching students:', error)
      toast.error(t('errorLoadingStudents'))
    } finally {
      setIsLoadingStudents(false)
    }
  }

  const handleCreateParent = async (parentData) => {
    setIsCreating(true)
    
    try {
      let formattedPhone = parentData.phone.replace(/\D/g, '')
      if (formattedPhone.length === 9) {
        formattedPhone = `998${formattedPhone}`
      }
      
      const payload = {
        full_name: parentData.full_name,
        phone: formattedPhone,
        password: parentData.password,
        students: parentData.students
      }

      const response = await request.post('/api/v1/auth/parent/create/', payload)
      
      if (response.status === 201) {
        const newParent = {
          id: Date.now(),
          full_name: parentData.full_name,
          phone: parentData.phone,
          students_count: parentData.students.length,
          status: "active",
          registration_date: new Date().toISOString(),
          last_login: null
        }
        
        setParents(prevParents => [...prevParents, newParent])
        
        setIsCreateModalOpen(false)
        toast.success(t('parentCreatedSuccessfully'))
      }
    } catch (error) {
      console.error('Error creating parent:', error)
      const errorMessage = error?.response?.data?.message || t('errorCreatingParent')
      toast.error(errorMessage)
    } finally {
      setIsCreating(false)
    }
  }


  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }
  useEffect(() => {
    fetchStudents()
  }, [])

 
  return (
    <div>
      <div className="flex justify-between items-center mb-[24px]">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-800"></h1>
        </div>
        <Button
          onclick={handleOpenCreateModal}
          classname="bg-[#5D87FF] hover:bg-[#4570EA] text-white"
        >
          {t('createParent')}
        </Button>
      </div>

     


      <CreateParentModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateParent}
        students={students}
        isLoading={isCreating}
        isLoadingStudents={isLoadingStudents}
      />
    </div>
  )
}

export default ParentsManagement