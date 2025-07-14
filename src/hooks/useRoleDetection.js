import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useUserStore } from '@/store/userStore'

export const useRoleDetection = () => {
  const { role, setRole, setUser } = useUserStore()
  const { data: session } = useSession()

  const { data: studentProfile, isLoading: studentLoading } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken,
  })

  useEffect(() => {
    if (studentProfile && studentProfile.data) {
      setUser(studentProfile.data)
      // Get role from API response
      const apiRole = studentProfile.data.role || studentProfile.role
      setRole(apiRole)
    }
  }, [studentProfile, setUser, setRole])

  const isLoading = studentLoading && !role
  const isTeacher = role === 'teacher' || role === 'mentor' || role === 'Teacher' || role === 'Mentor'

  return {
    role,
    isTeacher,
    isLoading,
    studentProfile
  }
} 