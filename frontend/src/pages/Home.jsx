import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-pink-100">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-grow flex flex-col justify-center items-center text-center p-6"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Create Your Website Instantly 🚀</h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Describe your idea, and let AI craft a beautiful, ready-to-publish website in seconds.
        </p>
        <Link to="/generate" className="px-6 py-3 bg-indigo-500 text-white rounded-full text-lg hover:scale-105 transform transition">
          Get Started
        </Link>
      </motion.div>
      <Footer />
    </div>
  );
}