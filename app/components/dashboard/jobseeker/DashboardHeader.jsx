
"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Mail,
  Menu,
  ChevronDown,
} from "lucide-react";

export default function DashboardHeader({
  user = null,
  onMenuClick,
}) {
  const userName = user?.name || "Jobseeker";
  const avatar = user?.image || user?.avatar || "";

  return (
    <header className="flex items-center justify-between gap-4 mb-7">

      {/* Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search for opportunities..."
            aria-label="Search opportunities"
            className="w-full rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3">

        <button
          type="button"
          aria-label="Messages"
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Mail size={19} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Bell size={19} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
        </button>

        <Link
          href="/dashboard/jobseeker/settings"
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <ChevronDown
            size={15}
            className="hidden sm:block text-slate-500"
          />
        </Link>

      </div>
    </header>
  );
}
