
'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuickActionButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-white text-gray-900 shadow-2xl shadow-white/20 flex items-center justify-center hover:bg-gray-100 transition-colors z-50"
      aria-label="Create New Job"
    >
      <Plus size={28} strokeWidth={2.5} />
    </motion.button>
  );
}