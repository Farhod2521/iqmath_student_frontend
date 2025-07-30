import { AnimatePresence, motion } from "framer-motion";

const SimpleModal = ({ children, classname, open, onClose }) => {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // If classname includes 'modal-lg', use max-w-2xl, else max-w-sm
  const sizeClass = classname && classname.includes('modal-lg')
    ? 'max-w-2xl'
    : 'max-w-sm';

  return (
    <AnimatePresence >
      <motion.div
        className={`fixed inset-0 min-h-screen  top-[-32px] flex items-center  justify-center  bg-black bg-opacity-60 ${classname || ''}`}
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`bg-white rounded-xl shadow-2xl w-full ${sizeClass} max-h-[80vh] overflow-y-auto`}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SimpleModal;
