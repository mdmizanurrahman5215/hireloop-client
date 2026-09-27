'use client';

import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const JOBS_DATA = Array(6).fill({
  title: 'Frontend Developer',
  description: 'Showcase your commitment to diversity and inclusion by highlighting initiatives',
  location: 'New York, USA',
  type: 'Hybrid',
  salary: '€25–€40/hour',
});

export default function JobDiscoverySection() {
  return (
    <section className="w-full bg-slate-50 dark:bg-[#05070B] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            <span>▪</span>
            <span>SMART JOB DISCOVERY</span>
            <span>▪</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-2xl mx-auto leading-tight">
            The roles you'd never find by searching
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-12">
          {JOBS_DATA.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#0e1219] border border-slate-200 dark:border-gray-800/80 hover:border-slate-300 dark:hover:border-gray-700 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm dark:shadow-lg"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-normal">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#151b26] text-[11px] text-slate-700 dark:text-gray-300 font-medium">
                    <MapPin className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#151b26] text-[11px] text-slate-700 dark:text-gray-300 font-medium">
                    <Briefcase className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    {job.type}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#151b26] text-[11px] text-slate-700 dark:text-gray-300 font-medium">
                    <DollarSign className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    {job.salary}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/jobs"
            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-gray-900 hover:bg-slate-800 dark:hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-md"
          >
            View all job open
          </Link>
        </motion.div>
      </div>
    </section>
  );
}