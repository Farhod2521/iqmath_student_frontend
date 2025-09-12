import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ exchanges }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {exchanges.map((exchange, index) => (
        <ProductCard 
          key={index} 
          exchange={exchange} 
          index={index} 
        />
      ))}
    </div>
  )
}

export default ProductGrid
