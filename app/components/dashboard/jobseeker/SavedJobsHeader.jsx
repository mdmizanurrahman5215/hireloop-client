
"use client";

import React from "react";
import Link from "next/link";

import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Upload,
} from "lucide-react";

export default function SavedJobsHeader({
  user = null,
  searchQuery = "",
  onSearchChange,
  onMenuClick,
}) {
  const userName = user?.name || "Jobseeker";
  const avatar = user?.image || user?.avatar || "";

  return (
    <header className="flex items-center justify-between gap-3 mb-7">

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

        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search jobs, companies, or skills..."
            aria-label="Search saved jobs"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 pl-9 pr-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40 transition"
          />
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 shrink-0">

        <button
          type="button"
          aria-label="Notifications"
          className="hidden sm:flex p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Bell size={18} />
        </button>

        <Link
          href="/dashboard/jobseeker/settings"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 text-xs font-medium transition-colors"
        >
          <Upload size={14} />
          <span className="hidden sm:inline">
            Upload Resume
          </span>
        </Link>

        <Link
          href="/dashboard/jobseeker/settings"
          className="flex items-center gap-2"
          aria-label="Profile settings"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <ChevronDown
            size={14}
            className="hidden sm:block text-slate-500"
          />
        </Link>

      </div>
    </header>
  );
}
