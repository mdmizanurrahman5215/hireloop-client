'use client';

import React from 'react';

export default function TopCompanies({ companies = [] }) {
  return (
    <div className="bg-white dark:bg-[#161B26] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/20 w-full lg:w-80 shrink-0 flex flex-col justify-between transition-colors">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            My Top Companies
          </h3>
          <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
            View all
          </button>
        </div>

        <div className="space-y-3">
          {companies.map((company) => {
            const Icon = company.icon;
            return (
              <div
                key={company.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-gray-800/30 border border-slate-200/80 dark:border-gray-800/80 hover:bg-slate-100 dark:hover:bg-gray-800/60 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                    style={{ backgroundColor: company.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {company.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">
                      {company.category ? `${company.category} • ` : ''}
                      {company.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {company.activeJobs}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-gray-500 font-semibold">
                    ACTIVE JOBS
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 dark:border-gray-700/80 hover:border-slate-300 dark:hover:border-gray-600 bg-slate-100 dark:bg-gray-800/40 hover:bg-slate-200 dark:hover:bg-gray-800 text-xs font-semibold text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all">
        View All Companies
      </button>
    </div>
  );
}