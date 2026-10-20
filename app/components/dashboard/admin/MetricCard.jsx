import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MetricCard({
  title,
  value,
  change,
  isNegative = false,
  icon: Icon,
}) {
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-slate-950/50 flex flex-col justify-between">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />

      <div className="flex items-center justify-between mb-3 relative z-10">
        {/* Metric Icon Container */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-slate-700 transition-colors">
          {Icon && <Icon className="w-4 h-4" />}
        </div>

        {/* Change Badge with Trend Arrow */}
        <div
          className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
            isNegative
              ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50"
              : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50"
          }`}
        >
          {isNegative ? (
            <TrendingDown className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          ) : (
            <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          )}
          <span>{change}</span>
        </div>
      </div>

      {/* Title & Value */}
      <div className="relative z-10">
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium tracking-wide">
          {title}
        </p>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 group-hover:scale-[1.01] transition-transform origin-left">
          {value}
        </h3>
      </div>
    </div>
  );
}