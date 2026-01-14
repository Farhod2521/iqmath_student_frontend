import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import MultiplicationModal from './components/multiplation-modal/MultiplicationModal'
import { Bs123 } from 'react-icons/bs'

const NavbarMultiplication = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Karra jadvali"
        className="flex items-center justify-center text-blue-600 transition rounded-full w-9 h-9 bg-blue-50 hover:bg-blue-100"
      >
        <Bs123 size={16} />
      </button>

      {open && <MultiplicationModal onClose={() => setOpen(false)} />}
    </>
  )
}

export default NavbarMultiplication
