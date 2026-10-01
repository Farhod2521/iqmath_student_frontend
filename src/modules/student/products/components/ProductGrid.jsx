import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ exchanges }) => {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {exchanges?.map((exchange, index) => (
        <ProductCard key={index} exchange={exchange} index={index} />
      ))}
    </div>
  )
}

export default ProductGrid
