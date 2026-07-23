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
  enabled = true,
  staleTime = 60_000,
  refetchOnWindowFocus = false,
  refetchOnMount = false
}) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const queryKey = Array.isArray(key) ? [...key, params] : [key, params]

  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
    queryKey,
    () =>
      request.get(url, {
        params,
        headers
        // headers: {
        //   Authorization: `Bearer ${session?.accessToken}`,
        //   ...headers
        // }
      }),
    {
      staleTime,
      keepPreviousData: true,
      refetchOnWindowFocus,
      refetchOnMount,
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
