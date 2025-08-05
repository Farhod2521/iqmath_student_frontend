import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useUserStore } from '@/store/userStore'

export const useRoleDetection = () => {
  const { role, setRole, setUser } = useUserStore()
  const { data: session, status } = useSession()
  const [timeoutError, setTimeoutError] = useState(false)

  // Clear role and user when session is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      setRole(null)
      setUser(null)
      setTimeoutError(false)
    }
  }, [status, setRole, setUser])

  const { data: studentProfile, isLoading: studentLoading, error } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken && status === 'authenticated',
    showErrorMsg: false // Error toast'ni o'chirib qo'yamiz
  })

  useEffect(() => {
    if (studentProfile && studentProfile.data) {
      setUser(studentProfile.data)
      // Get role from API response
      const apiRole = studentProfile.data.role || studentProfile.role
      setRole(apiRole)
      setTimeoutError(false) // Reset timeout error on success
    }
  }, [studentProfile, setUser, setRole])

  // Timeout mechanism to prevent infinite loading
  useEffect(() => {
    if (session?.accessToken && !role && !studentLoading && status === 'authenticated') {
      const timeout = setTimeout(() => {
        setTimeoutError(true)
      }, 10000) // 10 seconds timeout

      return () => clearTimeout(timeout)
    }
  }, [session?.accessToken, role, studentLoading, status])

  // Loading holatini yaxshilash
  // Session loading yoki student profile loading bo'lsa loading ko'rsatamiz
  // Timeout error bo'lsa loading'ni to'xtatamiz
  const isLoading = (status === 'loading' || (studentLoading && !role && session?.accessToken && status === 'authenticated')) && !timeoutError
  const isTeacher = role === 'teacher' || role === 'mentor' || role === 'Teacher' || role === 'Mentor'

  return {
    role,
    isTeacher,
    isLoading,
    studentProfile,
    error: error || timeoutError
  }
} 