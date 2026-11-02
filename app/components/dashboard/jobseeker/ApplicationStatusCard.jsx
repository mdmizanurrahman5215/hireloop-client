
"use client";

import React from "react";

const DEFAULT_STATUSES = [
  { label: "Applied", count: 10, color: "bg-slate-400" },
  { label: "Under Review", count: 6, color: "bg-amber-500" },
  { label: "Shortlisted", count: 5, color: "bg-blue-500" },
  { label: "Rejected", count: 2, color: "bg-red-500" },
  { label: "Hired", count: 1, color: "bg-emerald-500" },
];

export default function ApplicationStatusCard({
  statuses = DEFAULT_STATUSES,
}) {
  const safeStatuses = Array.isArray(statuses)
    ? statuses
    : DEFAULT_STATUSES;

  const total = safeStatuses.reduce(
    (sum, item) => sum + (Number(item?.count) || 0),
    0
  );

  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Application Status
        </h2>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          {total} Total
        </span>
      </div>

      <div className="space-y-4">
        {safeStatuses.map((item, index) => {
          const count = Number(item?.count) || 0;

          const percentage = total > 0
            ? (count / total) * 100
            : 0;

          return (
            <div key={`${item?.label || "status"}-${index}`}>

              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {item?.label || "Unknown"}
                </span>

                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {count}
                </span>
              </div>

              <div
                className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                role="progressbar"
                aria-label={`${item?.label || "Status"} applications`}
                aria-valuenow={count}
                aria-valuemin={0}
                aria-valuemax={total || 1}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item?.color || "bg-blue-500"}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
