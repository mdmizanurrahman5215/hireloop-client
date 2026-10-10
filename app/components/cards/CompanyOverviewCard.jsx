import React from 'react';

export default function CompanyOverviewCard({ company }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm dark:shadow-xl sticky top-6 transition-colors">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Company Overview</h3>

      {/* Workspace Preview */}
      <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 relative">
        <img
          src={company?.previewImage || '/office-preview.jpg'}
          alt={company?.name || 'Office'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Stats Table */}
      <div className="space-y-4 text-sm divide-y divide-slate-100 dark:divide-slate-800/60">
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            SIZE
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {company?.size || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center pt-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            INDUSTRY
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {company?.industry || 'N/A'}
          </span>
        </div>
      </div>

      {/* External Link */}
      <a
        href={company?.websiteUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950 transition-all"
      >
        Visit Website
      </a>
    </div>
  );
}