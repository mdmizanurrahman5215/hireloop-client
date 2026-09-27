'use client';

import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

const TRENDING_TAGS = [
  'Product Designer',
  'AI Engineering',
  'Dev-ops Engineer',
];

export default function HeroSection() {
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { jobQuery, locationQuery });
  };

  return (
    <section className="relative min-h-[85vh] w-full bg-slate-50 dark:bg-[#05070B] text-slate-900 dark:text-white flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 transition-colors duration-300">
      
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[450px] bg-indigo-500/10 dark:bg-indigo-900/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-indigo-400/15 dark:bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#111622] border border-slate-200 dark:border-gray-800/80 text-xs sm:text-sm text-slate-700 dark:text-gray-300 mb-8 shadow-sm dark:shadow-inner transition-colors"
        >
          <span className="text-base">💼</span>
          <span className="font-semibold text-slate-900 dark:text-white">50,000+</span>
          <span className="text-slate-500 dark:text-gray-400 tracking-wider uppercase text-[11px] sm:text-xs font-medium">
            NEW JOBS THIS MONTH
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
        >
          Find Your Dream Job Today
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10"
        >
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </motion.p>

        {/* Search Bar Box */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-3xl bg-white/80 dark:bg-[#0D111A]/90 border border-slate-200 dark:border-gray-800/90 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-xl dark:shadow-2xl backdrop-blur-md mb-8 transition-colors"
        >
          {/* Job Title Input */}
          <div className="flex items-center gap-3 px-3 py-2.5 w-full sm:flex-1 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-gray-800/80">
            <Search className="w-5 h-5 text-slate-400 dark:text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              className="bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none w-full"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-3 px-3 py-2.5 w-full sm:flex-1">
            <MapPin className="w-5 h-5 text-slate-400 dark:text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Location or Remote"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none w-full"
            />
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            aria-label="Search"
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-lg shadow-indigo-600/30"
          >
            <Search className="w-5 h-5" />
          </motion.button>
        </motion.form>

        {/* Trending Tags Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 dark:text-gray-400"
        >
          <span className="text-slate-500 dark:text-gray-500 mr-1 font-medium">Trending Position</span>
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setJobQuery(tag)}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#131926] hover:bg-indigo-50 dark:hover:bg-indigo-600/20 border border-slate-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-xs font-medium shadow-sm dark:shadow-none"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}