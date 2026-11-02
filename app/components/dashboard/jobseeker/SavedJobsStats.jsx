
"use client";

import React from "react";
import { Bookmark, Clock } from "lucide-react";

function SavedJobsStatCard({
  title,
  value = 0,
  icon: Icon,
  color = "blue",
  description,
}) {
  const colorStyles = {
    blue: "bg-blue-500/10 text-blue-500",
    amber: "bg-amber-500/10 text-amber-500",
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 min-w-0">

      <div
        className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${
          colorStyles[color] || colorStyles.blue
        }`}
      >
        {Icon && <Icon size={19} />}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {value ?? 0}
          </h3>

          {description && (
            <span className="hidden sm:inline text-[10px] text-slate-400">
              {description}
            </span>
          )}
        </div>
      </div>

    </div>
  );
}

export default function SavedJobsStats({
  totalSaved = 0,
  closingSoon = 0,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:max-w-md">

      <SavedJobsStatCard
        title="Total Saved"
        value={totalSaved}
        icon={Bookmark}
        color="blue"
      />

      <SavedJobsStatCard
        title="Closing Soon"
        value={closingSoon}
        icon={Clock}
        color="amber"
      />

    </div>
  );
}
