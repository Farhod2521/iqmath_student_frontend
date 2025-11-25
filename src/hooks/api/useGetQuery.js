import { useQuery } from '@tanstack/react-query'
import { request } from '@/services/api'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

const useGetQuery = ({
  key = 'get-all',
  url = '/',
  params = {},
  headers = {},
  showSuccessMsg = false,
  showErrorMsg = false,
  enabled = true
}) => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
    [key, params],
    () =>
      request.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          ...headers
        }
      }),
    {
      keepPreviousData: true,
      onSuccess: () => {
        if (showSuccessMsg) {
          toast.success(t('SUCCESS'))
        }
      },
      onError: (error) => {
        if (showErrorMsg) {
          const errorMessage = error?.response?.data?.message || t('ERROR')
          console.log(errorMessage)
        }
      },
      enabled: !!session?.accessToken && enabled
    }
  )

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    refetch
  }
}

export default useGetQuery
