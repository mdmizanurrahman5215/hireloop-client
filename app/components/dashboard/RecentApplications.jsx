
'use client';

import React from 'react';
import Image from 'next/image';

const STATUS_STYLES = {
  Interviewing: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  New: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  Reviewing: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
};

export default function RecentApplications({ applications = [] }) {
  return (
    <div className="bg-[#161B26] border border-gray-800/80 rounded-2xl p-6 shadow-xl shadow-black/20 flex-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Recent Applications</h3>
        <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800/80 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <th className="pb-3 px-2">Candidate Name</th>
              <th className="pb-3 px-2">Role</th>
              <th className="pb-3 px-2">Date Applied</th>
              <th className="pb-3 px-2">Experience</th>
              <th className="pb-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-sm">
            {applications.map((item) => (
              <tr key={item.id} className="hover:bg-gray-800/30 transition-colors group">
                <td className="py-3.5 px-2 font-semibold text-white flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-800 shrink-0">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <span>{item.name}</span>
                </td>
                <td className="py-3.5 px-2 text-gray-300 font-medium">{item.role}</td>
                <td className="py-3.5 px-2 text-gray-400 text-xs">{item.date}</td>
                <td className="py-3.5 px-2 text-gray-300 text-xs font-medium">{item.experience}</td>
                <td className="py-3.5 px-2 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                      STATUS_STYLES[item.status] || 'bg-gray-800 text-gray-300 border-gray-700'
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