"use client"
import React, { useState } from 'react';
import { Bookmark, CheckCircle2 } from 'lucide-react';

export default function JobHeaderBanner({ job, onApplyClick }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm dark:shadow-xl">
      {/* Left section: Logo + Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center shrink-0">
          <img
            src={job?.companyLogo || '/placeholder-logo.svg'}
            alt={job?.companyName || 'Company'}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {job?.title || 'Position Title'}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">
              {job?.companyName || 'Company Name'}
            </span>
            {job?.isVerified && (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={12} />
                Verified Employer
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right section: Action buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={() => setIsBookmarked((prev) => !prev)}
          className={`p-3 rounded-xl border transition-all ${
            isBookmarked
              ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
          }`}
          aria-label="Bookmark Job"
        >
          <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={onApplyClick}
          className="flex-1 sm:flex-initial px-6 py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-md active:scale-95"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}