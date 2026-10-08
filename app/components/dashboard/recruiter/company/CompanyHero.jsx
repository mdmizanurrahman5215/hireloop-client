'use client';

import React from 'react';
import { ExternalLink, Plus, CheckCircle2 } from 'lucide-react';

export default function CompanyHero({ company }) {
  // Format external website link safely
  const formatWebsiteUrl = (url) => {
    if (!url || typeof url !== 'string') return '#';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const websiteHref = formatWebsiteUrl(company?.website);
  const isWebsiteAvailable = Boolean(company?.website);

  return (
    <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden shadow-sm transition-colors duration-200">
      {/* Background Sphere Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-500/10 dark:bg-blue-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Company Logo Badge */}
          <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src={company?.logo || '/images/company-placeholder.png'}
              alt={company?.name || 'Company Logo'}
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                e.currentTarget.src = '/images/company-placeholder.png';
              }}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {company?.name || 'LuminaTech Systems'}
              </h1>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" /> APPROVED
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl line-clamp-2 leading-relaxed">
              {company?.description ||
                'Engineering the future of enterprise cloud intelligence and distributed ledger solutions.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" /> Follow
          </button>

          <a
            href={websiteHref}
            target={isWebsiteAvailable ? '_blank' : '_self'}
            rel={isWebsiteAvailable ? 'noreferrer' : undefined}
            onClick={(e) => {
              if (!isWebsiteAvailable) e.preventDefault();
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              isWebsiteAvailable
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-[0.98]'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            Visit Website <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}