import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="text-xl font-bold text-indigo-600"
      >
        CodeDrishti
      </motion.h1>
    </motion.nav>
  );
}