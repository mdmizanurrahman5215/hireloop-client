'use client';

import React from 'react';
import { Building2, Plus, ExternalLink } from 'lucide-react';

export default function EmptyCompanyState({ onOpenModal }) {
  const handleRegisterClick = (e) => {
    e?.preventDefault?.();
    onOpenModal?.();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 transition-colors duration-200">
      {/* Icon Badge */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
          <Building2 className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-slate-50 dark:border-slate-950">
          <Plus className="w-4 h-4" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Company not registered yet
      </h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm mb-8 leading-relaxed">
        Set up your business profile to start posting high-performance job listings and manage your talent loop.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleRegisterClick}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98]"
        >
          Register your company
        </button>

        <button
          type="button"
          className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          View FAQ
        </button>
      </div>

      {/* Secondary Helper Text */}
      <p className="mt-12 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
        Need specialized assistance?
        <button
          type="button"
          className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium underline inline-flex items-center gap-0.5 focus:outline-none"
        >
          Contact enterprise support <ExternalLink className="w-3 h-3" />
        </button>
      </p>
    </div>
  );
}