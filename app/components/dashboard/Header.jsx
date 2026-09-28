
'use client';

import React from 'react';
import Image from 'next/image';
import { Search, Bell } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="h-18 px-8 py-4 border-b border-gray-800/80 bg-[#0F1117]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between gap-4">
      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search applications, jobs, or talent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#161B26] border border-gray-800/80 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Right Header Items */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2.5 rounded-xl bg-[#161B26] border border-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-800 transition-all">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-[#0F1117]" />
        </button>

        <div className="h-6 w-[1px] bg-gray-800" />

        {/* User Mini Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <h5 className="text-sm font-semibold text-white leading-tight">Alex Sterling</h5>
            <p className="text-xs text-gray-400">Recruiter</p>
          </div>
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-indigo-900 border border-indigo-500/40">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Alex Sterling Profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}