'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ActiveRolesCard({ roles = [] }) {
  const rolesCount = roles?.length || 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Active Roles
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
          {rolesCount}
        </span>
      </div>

      {/* Roles List */}
      <div className="space-y-3">
        {roles?.map((role, idx) => {
          const roleKey = role?.id || role?.title || idx;

          return (
            <div
              key={roleKey}
              className="group p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                  {role?.title || 'Untitled Position'}
                </h4>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium">
                  {role?.type || 'Full-time'}
                </span>
                <span>•</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {role?.salary || 'Competitive'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => role?.onApply?.(role)}
                className="w-full mt-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98]"
              >
                Quick Apply
              </button>
            </div>
          );
        })}

        {rolesCount === 0 && (
          <div className="text-center py-6 text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            No active positions available.
          </div>
        )}
      </div>

      {/* Footer Link */}
      {rolesCount > 0 && (
        <button
          type="button"
          className="w-full text-center text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-1 transition-colors focus:outline-none"
        >
          See all {rolesCount} openings
        </button>
      )}
    </div>
  );
}