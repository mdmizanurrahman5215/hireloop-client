'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-300 px-6 py-12 bg-gray-50 dark:bg-[#0B0F17] text-gray-900 dark:text-gray-100">
      
      {/* Background Decorative Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#000000_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:32px_32px]"
      />

      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center z-10 relative">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold mb-6"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Error Code 404 — Page Not Found</span>
        </motion.div>

        {/* Clear Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
        >
          Lost in the <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-orange-500 text-transparent bg-clip-text">HireLoop</span> Ecosystem?
        </motion.h1>

        {/* Readable Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed text-gray-600 dark:text-gray-400"
        >
          Aponi je URL-ti khujchen seta hoyto shorano hoyeche, dynamic route-e kono vul ache, othoba page-ti ar live nei. Nicher link gulo babohar kore dorkari page-e phire jan.
        </motion.p>

        {/* Interactive Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left mb-8"
        >
          <Link href="/">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl border transition-all bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 dark:hover:bg-[#1f2937] shadow-sm dark:shadow-none"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mb-3">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base mb-1">Return Home</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Go back to HireLoop homepage
              </p>
            </motion.div>
          </Link>

          <Link href="/jobs">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl border transition-all bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 dark:hover:bg-[#1f2937] shadow-sm dark:shadow-none"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base mb-1">Explore Jobs</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Browse active job listings
              </p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Quick Links Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          <Link href="/companies" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Companies
          </Link>
          <span>•</span>
          <Link href="/pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Pricing
          </Link>
          <span>•</span>
          <Link href="/signin" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Sign In
          </Link>
        </motion.div>
      </div>
    </div>
  );
}