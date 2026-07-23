import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const SimpleModalTeacher = ({ children, classname }) => {
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-70 transition-all duration-300 ${classname}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="bg-white  rounded-[16px] shadow-lg w-[497px] font-sf"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default SimpleModalTeacher
