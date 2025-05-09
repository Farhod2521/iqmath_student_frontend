import React from 'react'

import { useMyStudyStore } from '@/store'

function NavbarStudy() {
  const tab = useMyStudyStore((state) => state.tab)
  const handleTab = useMyStudyStore((state) => state.handleTab)

  return (
    <div className="flex gap-2 px-2 py-1 bg-[#F2F2F7] rounded-[8px]">
      <button
        onClick={() => handleTab('active')}
        className={` rounded-md   px-2 py-1 font-medium transition-all duration-300 capitalize ${
          tab === 'active' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
        }`}
      >
        Активные
      </button>
      <button
        onClick={() => handleTab('frozen')}
        className={`rounded-md  px-2 py-1 font-medium  transition-all duration-300 capitalize ${
          tab === 'frozen' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
        }`}
      >
        Замароженные
      </button>
    </div>
  )
}

export default NavbarStudy
