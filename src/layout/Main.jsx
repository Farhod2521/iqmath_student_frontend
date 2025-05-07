import React from 'react'
import Navbar from './Navbar'

function Main({ children }) {
  return (
    <div className={`transition-all duration-300 flex-1 font-sf  ${true ? 'lg:ml-[350px]' : 'lg:ml-0'}`}>
      <Navbar />
      <div className="p-24">{children}</div>
    </div>
  )
}

export default Main
