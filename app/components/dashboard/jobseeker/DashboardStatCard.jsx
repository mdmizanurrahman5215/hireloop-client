
"use client";

import React from "react";
import Link from "next/link";

export default function DashboardStatCard({
  title = "Statistics",
  value = 0,
  icon: Icon,
  color = "blue",
  href = "#",
}) {
  const colorStyles = {
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-emerald-500 bg-emerald-500/10",
    orange: "text-orange-500 bg-orange-500/10",
    purple: "text-purple-500 bg-purple-500/10",
  };

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/20"
    >
      <div className="flex items-center justify-between gap-3 mb-3">

        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        {Icon && (
          <div className={`p-2 rounded-lg ${colorStyles[color] || colorStyles.blue}`}>
            <Icon size={17} />
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
        {value ?? 0}
      </h3>
    </Link>
  );
}
