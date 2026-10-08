'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, color = 'indigo' }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-[#161B26] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl shadow-slate-200/50 dark:shadow-black/20 transition-colors"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-gray-800/70 border border-slate-200 dark:border-gray-700/50 flex items-center justify-center text-slate-700 dark:text-gray-300 mb-4 transition-colors">
        <Icon size={20} />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>
      </div>
    </motion.div>
  );
}