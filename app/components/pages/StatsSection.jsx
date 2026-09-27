'use client';

import { motion } from 'framer-motion';
import { Briefcase, Building2, Search, Star } from 'lucide-react';

const STATS_DATA = [
  { icon: Briefcase, value: '50K', label: 'Active Jobs' },
  { icon: Building2, value: '12K', label: 'Companies' },
  { icon: Search, value: '2M', label: 'Job Seekers' },
  { icon: Star, value: '97%', label: 'Satisfaction Rate' },
];

export default function StatsSection() {
  return (
    <section className="relative w-full bg-slate-50 dark:bg-[#05070B] text-slate-900 dark:text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] sm:w-[900px] h-[300px] bg-indigo-500/15 dark:bg-indigo-600/25 blur-[130px] rounded-full" />
        <div className="absolute -top-32 w-[700px] sm:w-[1100px] md:w-[1300px] h-[400px] sm:h-[600px] rounded-[50%] border-t border-indigo-400/30 dark:border-indigo-500/30 bg-gradient-to-b from-slate-200/50 dark:from-[#111827]/60 via-slate-100/80 dark:via-[#0A0D14]/90 to-slate-50 dark:to-[#05070B] backdrop-blur-3xl shadow-sm dark:shadow-[0_-20px_80px_rgba(79,70,229,0.2)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-center max-w-3xl leading-snug sm:leading-tight mb-14 text-slate-800 dark:text-gray-100"
        >
          Assisting over <span className="font-semibold text-slate-900 dark:text-white">15,000 job seekers</span> find their dream positions.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
          {STATS_DATA.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/90 dark:bg-[#0C1017]/90 border border-slate-200/80 dark:border-gray-800/80 hover:border-slate-300 dark:hover:border-gray-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-44 sm:h-48 shadow-md dark:shadow-xl backdrop-blur-md transition-all group"
              >
                <div className="text-slate-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}