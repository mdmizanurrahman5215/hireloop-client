import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function JobBenefitsGrid({ benefits = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Benefits</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {benefits?.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <ShieldCheck size={18} />
            </div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}