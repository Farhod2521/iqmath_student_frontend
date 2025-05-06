import { motion } from "framer-motion";
const AnimateUp = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: "30px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateUp;
