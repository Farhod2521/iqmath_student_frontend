import { AnimatePresence, motion } from "framer-motion";

const WarningModal = ({ children, classname }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className={`${classname}  bg-[#FFF4E5] border border-[#FF9500]  p-[16px] rounded-md shadow-lg `}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default WarningModal;
