
"use client";

import React from "react";
import {
  FileText,
  CheckCircle2,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

const STAT_CONFIG = [
  {
    key: "totalApplied",
    label: "Total Applied",
    icon: FileText,
    color: "slate",
  },
  {
    key: "shortlisted",
    label: "Shortlisted",
    icon: CheckCircle2,
    color: "blue",
  },
  {
    key: "interviews",
    label: "Interviews",
    icon: CalendarDays,
    color: "amber",
  },
  {
    key: "successRate",
    label: "Success Rate",
    icon: TrendingUp,
    color: "green",
    suffix: "%",
  },
];

const ICON_STYLES = {
  slate: "bg-slate-100 dark:bg-slate-800 text-slate-500",
  blue: "bg-blue-500/10 text-blue-500",
  amber: "bg-amber-500/10 text-amber-500",
  green: "bg-emerald-500/10 text-emerald-500",
};

export default function ApplicationsStats({
  stats = {},
}) {
  const safeStats = stats ?? {};

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {STAT_CONFIG.map((item) => {
        const Icon = item.icon;
        const value = Number(safeStats?.[item.key]) || 0;

        return (
          <div
            key={item.key}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.label}
              </p>

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${ICON_STYLES[item.color]}`}
              >
                <Icon size={16} />
              </div>
            </div>

            <h3
              className={`mt-2 text-2xl font-bold tabular-nums ${
                item.color === "green"
                  ? "text-emerald-500"
                  : item.color === "amber"
                    ? "text-amber-500"
                    : "text-slate-900 dark:text-white"
              }`}
            >
              {value}{item.suffix || ""}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
