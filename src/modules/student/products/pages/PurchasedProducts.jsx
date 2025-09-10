import React from 'react'
import { usePurchasedProducts } from '@/hooks'
import { 
  LoadingState, 
  ErrorState, 
  EmptyState, 
  ProductGrid 
} from '../components'

const PurchasedProducts = () => {
  const { data, isLoading, error } = usePurchasedProducts()


  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState />
  }

  const exchanges = data?.data?.exchanges || []

  if (exchanges.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="p-6">
      <ProductGrid exchanges={exchanges} />
    </div>
  )
}

export default PurchasedProducts
