import { request } from '@/services/api'
import { toast } from 'react-hot-toast'

export const getPaymentInitiate = () =>
  request.post('/api/v1/payments/initiate-payment/').catch(() => {
    //   toast.error('Maʼlumotlarni olishda xatolik yuz berdi')
  })
export const getPaymentTrailDays = () =>
  request.get('/api/v1/payments/subscription/trial_days/').catch(() => {
    //   toast.error('Maʼlumotlarni olishda xatolik yuz berdi')
  })
