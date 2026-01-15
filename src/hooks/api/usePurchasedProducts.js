import { RolesList } from '@/layout/libs/menulist'
import { useRoleDetection } from '../useRoleDetection'
import useGetQuery from './useGetQuery'
import { URLS } from '@/constants/url'

export const usePurchasedProducts = (options = {}) => {
  const { role } = useRoleDetection()

  let url = URLS.purchasedProducts
  let queryKey = ['purchasedProducts']

  switch (role) {
    case RolesList.STUDENT:
      url = URLS.purchasedProducts
      queryKey = ['purchasedProducts', 'student']
      break

    case RolesList.TEACHER:
      url = URLS.productsExchangeList
      queryKey = ['productsExchangeList', 'teacher']
      break

    // case RolesList.TUTOR:
    //   url = URLS.tutorPurchasedProducts
    //   queryKey = ['purchasedProducts', 'tutor']
    //   break

    // case RolesList.SUPERADMIN:
    //   url = URLS.allPurchasedProducts
    //   queryKey = ['purchasedProducts', 'admin']
    //   break

    default:
      break
  }

  return useGetQuery({
    url,
    key: queryKey,
    enabled: !!role, // role aniqlanmaguncha request ketmasin
    ...options
  })
}
