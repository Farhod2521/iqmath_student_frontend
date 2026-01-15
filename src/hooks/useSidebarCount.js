import { RolesList } from '@/layout/libs/menulist'
import { URLS } from '@/constants/url'
import useGetQuery from './api/useGetQuery'

export const useSidebarCount = (options = {}) => {
  //   const { role } = useRoleDetection()

  //   let url = URLS.chatUnreadTotal
  //   let queryKey = ['chatUnreadTotal']

  //   switch (role) {
  //     case RolesList.STUDENT:
  //       url = URLS.purchasedProducts
  //       queryKey = ['purchasedProducts', 'student']
  //       break

  //     case RolesList.TEACHER:
  //       url = URLS.productsExchangeList
  //       queryKey = ['productsExchangeList', 'teacher']
  //       break

  //     // case RolesList.TUTOR:
  //     //   url = URLS.tutorPurchasedProducts
  //     //   queryKey = ['purchasedProducts', 'tutor']
  //     //   break

  //     // case RolesList.SUPERADMIN:
  //     //   url = URLS.allPurchasedProducts
  //     //   queryKey = ['purchasedProducts', 'admin']
  //     //   break

  //     default:
  //       break
  //   }

  return useGetQuery({
    url: URLS.chatUnreadTotal,
    key: ['chatUnreadTotal'],
    ...options
  })
}
