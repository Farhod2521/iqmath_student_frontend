import React from 'react'
import { usePurchasedProducts } from '@/hooks'
import { LoadingState, ErrorState, EmptyState, ProductGrid } from '../components'

const PurchasedProducts = () => {
  const { data, isLoading, error } = usePurchasedProducts()

  if (isLoading) {
    return <LoadingState />
  }

  const exchanges = data?.data?.exchanges || []

  if (exchanges.length === 0 || error) {
    return <EmptyState />
  }

  return (
    <div className="p-6">
      <ProductGrid exchanges={exchanges} />
    </div>
  )
}

export default PurchasedProducts
