import useGetQuery from './useGetQuery'
import { URLS } from '@/constants/url'

export const usePurchasedProducts = (options = {}) => {
  return useGetQuery({
    url: URLS.purchasedProducts,
    key: ['purchasedProducts'],
    ...options
  })
}
