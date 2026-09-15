import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { get } from 'lodash'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import AddChildModal from '@/modules/parent/children/components/AddChildModal'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import ParentHomeHero from '../components/ParentHomeHero'
import ParentStatsGrid from '../components/ParentStatsGrid'
import ParentChildrenCard from '../components/ParentChildrenCard'
import ParentQuickActions from '../components/ParentQuickActions'

const ParentHome = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data: profileData } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile
  })

  const { data: childrenData, isLoading } = useGetQuery({
    key: 'parent-children',
    url: '/api/v1/auth/parent/confirm-child/list/',
    showErrorMsg: false
  })

  const fullName = get(profileData, 'data.full_name', '')

  const children = useMemo(() => {
    if (!childrenData) return []
    if (Array.isArray(childrenData)) return childrenData
    if (Array.isArray(childrenData.data)) return childrenData.data
    if (Array.isArray(childrenData.results)) return childrenData.results
    return []
  }, [childrenData])

  const activeSubjects = useMemo(() => {
    const names = new Set(
      children.filter((c) => c.status && c.subject_name_uz).map((c) => c.subject_name_uz)
    )
    return Array.from(names)
  }, [children])

  const remainingDays = useMemo(() => {
    const values = children.map((c) => c.remaining_days).filter((v) => typeof v === 'number')
    return values.length ? Math.max(...values) : null
  }, [children])

  const lastLoginText = useMemo(() => {
    const withLogin = children.filter((c) => c.last_login_time)
    if (!withLogin.length) return ''
    return withLogin[0].last_login_time
  }, [children])

  const handleAddChildSuccess = () => {
    queryClient.invalidateQueries(['parent-children'])
  }

  const handleDownloadCertificate = (studentId) => {
    if (!studentId) return
    request
      .post(URLS.downloadCertificate, { student_id: studentId }, { responseType: 'blob' })
      .then((res) => {
        if (res.status !== 200 || !res.data) return
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Certificate_file.pdf')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
      .catch((err) => {
        toast.error(err?.message || err?.data?.message || t('downloadCertificateError'))
      })
  }

  return (
    <div className="flex flex-col gap-3 pb-4">
      <ParentHomeHero fullName={fullName} onAddChild={() => setIsAddModalOpen(true)} />

      <ParentStatsGrid
        childrenCount={children.length}
        activeSubjectsCount={activeSubjects.length}
        activeSubjectsLabel={activeSubjects.join(', ')}
        remainingDays={remainingDays}
        lastLoginText={lastLoginText}
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ParentChildrenCard
            children={children}
            isLoading={isLoading}
            onAddChild={() => setIsAddModalOpen(true)}
            onDownloadCertificate={handleDownloadCertificate}
          />
        </div>
        <div className="lg:col-span-4">
          <ParentQuickActions />
        </div>
      </div>

      <AddChildModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={handleAddChildSuccess} />
      <ModalConfidentiality />
    </div>
  )
}

export default ParentHome
