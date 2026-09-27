'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';

export default function Loading() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0B0F17] text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Loader Graphic Container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Rotating Dash Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-dashed border-indigo-500/30"
        />

        {/* Opposite Inner Gradient Spinning Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-transparent border-t-indigo-500 border-r-sky-400"
        />

        {/* Pulse Glow Effect Ring */}
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-indigo-500/20 to-orange-500/20 border border-indigo-500/40 backdrop-blur-sm"
        />

        {/* Center Animated Icon */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute z-10 text-indigo-400"
        >
          <Briefcase className="w-7 h-7 sm:w-9 sm:h-9" />
        </motion.div>
      </div>

      {/* Brand & Loading Status Text */}
      <div className="text-center space-y-2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl font-bold tracking-tight"
        >
          <span className="text-sky-400">Hire</span>
          <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-orange-500 text-transparent bg-clip-text">
            Loop
          </span>
        </motion.div>

        {/* Pulsing Dots Label */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`text-xs sm:text-sm font-medium tracking-wide ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Fetching opportunities...
        </motion.p>
      </div>

      {/* Animated Loading Bar */}
      <div className="w-36 sm:w-48 h-1 bg-gray-800/80 rounded-full overflow-hidden mt-6 z-10 border border-gray-700/30">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-500 rounded-full"
        />
      </div>
    </div>
  );
}