'use client';

import React from 'react';
import Image from 'next/image';

const STATUS_STYLES = {
  Interviewing:
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  New: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
  Reviewing:
    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  Rejected:
    'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
};

export default function RecentApplications({ applications = [] }) {
  return (
    <div className="bg-white dark:bg-[#161B26] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/20 flex-1 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Applications
        </h3>
        <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-gray-800/80 text-[11px] font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="pb-3 px-2">Candidate Name</th>
              <th className="pb-3 px-2">Role</th>
              <th className="pb-3 px-2">Date Applied</th>
              <th className="pb-3 px-2">Experience</th>
              <th className="pb-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-800/50 text-sm">
            {applications.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 dark:hover:bg-gray-800/30 transition-colors group"
              >
                <td className="py-3.5 px-2 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 dark:bg-gray-800 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{item.name}</span>
                </td>
                <td className="py-3.5 px-2 text-slate-700 dark:text-gray-300 font-medium">
                  {item.role}
                </td>
                <td className="py-3.5 px-2 text-slate-500 dark:text-gray-400 text-xs">
                  {item.date}
                </td>
                <td className="py-3.5 px-2 text-slate-700 dark:text-gray-300 text-xs font-medium">
                  {item.experience}
                </td>
                <td className="py-3.5 px-2 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                      STATUS_STYLES[item.status] ||
                      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}