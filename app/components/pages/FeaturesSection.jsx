'use client';

import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  BarChart2,
  Bookmark,
  MousePointerClick,
  FileText,
  Hexagon,
  LineChart,
} from 'lucide-react';

const FEATURES_DATA = [
  { icon: Search, title: 'Smart Search', description: 'Find your ideal job with advanced filters.' },
  { icon: TrendingUp, title: 'Salary Insights', description: 'Get real salary data to negotiate confidently.' },
  { icon: BarChart2, title: 'Top Companies', description: 'Apply to vetted companies that are hiring.' },
  { icon: Bookmark, title: 'Saved Jobs', description: 'Manage apps & favorites on your dashboard.' },
  { icon: MousePointerClick, title: 'One-Click Apply', description: 'Simplify your job applications for an easier process!' },
  { icon: FileText, title: 'Resume Builder', description: 'Create professional resumes with modern templates.' },
  { icon: Hexagon, title: 'Skill-Based Matching', description: 'Discover jobs that match your skills and experience.' },
  { icon: LineChart, title: 'Career Growth Resources', description: 'Boost your career with quick interview tips.' },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-slate-50 dark:bg-[#05070B] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            <span>▪</span>
            <span>FEATURES JOB</span>
            <span>▪</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-xl mx-auto leading-tight">
            Everything you need to succeed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {FEATURES_DATA.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/80 dark:bg-[#090D14]/60 border border-slate-200/80 dark:border-gray-800/50 hover:border-indigo-400/50 dark:hover:border-indigo-500/30 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-gray-800/80 flex items-center justify-center shrink-0 text-pink-600 dark:text-pink-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-normal">
                    {feature.description}
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