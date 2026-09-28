"use client";

import React from "react";
import Image from "next/image";
import { Search, Bell } from "lucide-react";
import { authClient } from "../../lib/auth-client";

export default function Header({ searchQuery, setSearchQuery }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  return (
    <header className="h-18 px-8 py-4 border-b border-gray-800/80 bg-[#0F1117]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between gap-4">
      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
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
        <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-3.5 mb-6 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-indigo-900/50 border border-indigo-500/30 shrink-0 flex items-center justify-center">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user?.name || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              /* ইমেজ না থাকলে নামের প্রথম অক্ষরটি Capital Letter-এ দেখাবে */
              <span className="text-indigo-300 font-bold text-base select-none">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-white truncate">
              {user?.name}
            </h4>
            <p className="text-[11px] text-gray-400 truncate">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
