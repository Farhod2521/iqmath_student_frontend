import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from '../../services/api'
import { toast } from 'react-hot-toast'
import { isArray, get, forEach, isObject, values } from 'lodash'

const postRequest = (url, attributes, config = {}) => request.post(url, attributes, config)

const usePostQuery = ({ hideSuccessToast = false, listKeyId = null, hideErrorToast = false }) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading, isError, error, isFetching } = useMutation(
    ({ url, attributes, config = {} }) => postRequest(url, attributes, config),
    {
      onSuccess: (data) => {
        if (!hideSuccessToast) {
          toast.success(data?.data?.message || 'SUCCESS')
        }

        if (listKeyId) {
          if (isArray(listKeyId)) {
            forEach(listKeyId, (val) => {
              queryClient.invalidateQueries(val)
            })
          } else {
            queryClient.invalidateQueries(listKeyId)
          }
        }
      },
      onError: (data) => {
        console.log(data)
      }
    }
  )

  return {
    mutate,
    isLoading,
    isError,
    error,
    isFetching
  }
}
export default usePostQuery
