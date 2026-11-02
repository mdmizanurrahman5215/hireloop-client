
"use client";

import React from "react";
import Link from "next/link";
import { UserRound, Pencil } from "lucide-react";

export default function DashboardProfileCard({ user = null }) {
  const name = user?.name || "Your Name";
  const email = user?.email || "No email available";
  const avatar = user?.image || user?.avatar || "";

  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">

          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserRound
              size={27}
              className="text-slate-400"
            />
          )}

        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
            {name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
            {email}
          </p>

          <span className="inline-flex mt-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Job Seeker
          </span>
        </div>

      </div>

      <Link
        href="/dashboard/jobseeker/settings"
        className="mt-6 flex items-center justify-center gap-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <Pencil size={14} />
        Edit Profile
      </Link>

    </section>
  );
}
