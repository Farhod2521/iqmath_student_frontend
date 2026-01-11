import React from 'react'
import { usePurchasedProducts } from '@/hooks'
import { LoadingState, EmptyState } from '../components'

const ProductsExchange = () => {
  const { data, isLoading, error } = usePurchasedProducts()

  if (isLoading) {
    return <LoadingState />
  }

  const exchanges = data?.data?.results || []

  if (exchanges.length === 0 || error) {
    return <EmptyState />
  }

  return <div className="p-6">{/* <ProductGrid exchanges={exchanges} /> */}</div>
}

export default ProductsExchange
