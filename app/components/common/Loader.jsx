'use client';

import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Loader() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0A0D14] text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/15 to-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Sparkles in Background */}
      <motion.div
        animate={{ opacity: [0.2, 0.8, 0.2], y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 text-indigo-400/40 pointer-events-none"
      >
        <Sparkles size={28} />
      </motion.div>

      {/* Main 3D Card Scanner Stage */}
      <div className="relative w-64 h-40 sm:w-80 sm:h-48 flex items-center justify-center perspective-1000 mb-8">
        {/* Floating Background Card Shadow Effect */}
        <motion.div
          animate={{ rotateX: [15, -15, 15], rotateY: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-full h-full rounded-2xl border backdrop-blur-xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden ${
            isDarkMode
              ? 'bg-[#121824]/90 border-gray-800 shadow-indigo-500/10'
              : 'bg-white/90 border-gray-200 shadow-xl shadow-gray-200/50'
          }`}
        >
          {/* Skeleton Lines representing Job/Resume Data */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sparkles size={20} />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="w-24 h-3 bg-indigo-500/30 rounded-md animate-pulse" />
                <div className="w-16 h-2 bg-gray-500/20 rounded-md" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="w-full h-2 bg-gray-500/15 rounded-full" />
              <div className="w-4/5 h-2 bg-gray-500/15 rounded-full" />
              <div className="w-3/5 h-2 bg-gray-500/15 rounded-full" />
            </div>
          </div>

          {/* Bottom Badge inside Card */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-800/40">
            <span className="text-[10px] font-semibold tracking-wider text-indigo-400 uppercase">
              HireLoop AI Engine
            </span>
            <CheckCircle2 size={14} className="text-sky-400" />
          </div>

          {/* Laser Scanning Beam Line Effect */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8] pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Dynamic Status Text */}
      <div className="text-center space-y-3 z-10 px-4">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg sm:text-xl font-bold tracking-tight"
        >
          Matching Best Opportunities
        </motion.h3>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
          >
            Searching Jobs
          </motion.span>
          <span>•</span>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400"
          >
            Analyzing Skills
          </motion.span>
        </div>
      </div>
    </div>
  );
}