import React from 'react';
import { DollarSign, MapPin, Clock, Briefcase } from 'lucide-react';

export default function JobQuickMetrics({ metrics }) {
  const items = [
    {
      label: 'SALARY RANGE',
      value: metrics?.salary || 'N/A',
      icon: DollarSign,
    },
    {
      label: 'LOCATION',
      value: metrics?.location || 'N/A',
      icon: MapPin,
    },
    {
      label: 'JOB TYPE',
      value: metrics?.jobType || 'N/A',
      icon: Clock,
    },
    {
      label: 'EXPERIENCE',
      value: metrics?.experience || 'N/A',
      icon: Briefcase,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-3 shadow-sm transition-colors"
          >
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
              <IconComponent size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}