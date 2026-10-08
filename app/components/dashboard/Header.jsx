"use client";

import React from "react";
import Image from "next/image";
import { Search, Bell, Menu } from "lucide-react";
import { authClient } from "../../lib/auth-client";

export default function Header({ searchQuery = "", setSearchQuery, onMobileMenuOpen }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="h-18 px-4 md:px-8 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0F1117]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between gap-4 transition-colors">
      {/* Mobile Menu Button */}
      {onMobileMenuOpen && (
        <button
          onClick={onMobileMenuOpen}
          className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
          aria-label="Open Mobile Menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search applications, jobs, or talent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          className="w-full bg-slate-100 dark:bg-[#161B26] border border-slate-200 dark:border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Right Header Items */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Notification Bell */}
        <button
          className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-[#161B26] border border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all focus:outline-none"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#0F1117]" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* User Mini Badge */}
        <div className="bg-slate-100 dark:bg-[#161B26] border border-slate-200 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center gap-3 transition-colors">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-500/30 shrink-0 flex items-center justify-center">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user?.name || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-indigo-600 dark:text-indigo-300 font-bold text-sm sm:text-base select-none">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>

          <div className="overflow-hidden hidden sm:block">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
              {user?.name || "User"}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {user?.role || "Recruiter"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}