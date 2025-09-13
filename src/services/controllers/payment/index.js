import { request } from '@/services/api'
import { toast } from 'react-hot-toast'

export const getPaymentInitiate = (subscriptionId, couponCode = null) => {
  const payload = {}
  
  if (subscriptionId) {
    payload.subscription_id = subscriptionId
  }
  
  if (couponCode) {
    payload.coupon_code = couponCode
  }
  
  return request.post('/api/v1/payments/initiate-payment/', payload).catch(() => {
    //   toast.error('Maʼlumotlarni olishda xatolik yuz berdi')
  })
}
export const getPaymentTrailDays = () =>
  request.get('/api/v1/payments/subscription/trial_days/').catch(() => {
    //   toast.error('Maʼlumotlarni olishda xatolik yuz berdi')
  })
