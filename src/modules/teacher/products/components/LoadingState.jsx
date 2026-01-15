import React from 'react'

const LoadingState = () => {
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-[#202936] rounded-[10px] dark:border-[#2A3447FF] p-6">
        <div className="py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D87FF] mx-auto"></div>
          <p className="text-[#5A6A85] dark:text-gray-400 mt-4">Yuklanmoqda...</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingState
