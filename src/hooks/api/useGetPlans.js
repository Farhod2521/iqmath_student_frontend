import useGetQuery from './useGetQuery'
import { URLS } from '@/constants/url'

export const useGetPlans = (options = {}) => {
  return useGetQuery({
    url: URLS.paymentPlans,
    key: ['paymentPlans'],
    ...options
  })
}
