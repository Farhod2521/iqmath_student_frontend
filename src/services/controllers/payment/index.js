import { request } from '@/services/api'

export const getPaymentInitiate = () => request.get('/api/v1/payments/initiate-payment/')
export const getPaymentTrailDays = () => request.get('/api/v1/payments/subscription/trial_days/')
