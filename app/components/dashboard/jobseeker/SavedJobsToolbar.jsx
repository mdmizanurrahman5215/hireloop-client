
"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

const DEFAULT_FILTERS = [
  { label: "All Saved", value: "all" },
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
  { label: "Product", value: "product" },
];

export default function SavedJobsToolbar({
  activeFilter = "all",
  onFilterChange,
  sortBy = "recent",
  onSortChange,
  filters = DEFAULT_FILTERS,
}) {
  const safeFilters = Array.isArray(filters)
    ? filters
    : DEFAULT_FILTERS;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-3">

      {/* Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">

        {safeFilters.map((filter) => {
          const isActive = activeFilter === filter?.value;

          return (
            <button
              key={filter?.value}
              type="button"
              onClick={() => onFilterChange?.(filter?.value)}
              aria-pressed={isActive}
              className={`shrink-0 rounded-lg px-3 py-2 text-[11px] sm:text-xs font-medium transition-colors ${
                isActive
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/70"
              }`}
            >
              {filter?.label}
            </button>
          );
        })}

      </div>

      {/* Sorting */}
      <div className="flex items-center justify-end gap-2 shrink-0">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Sort by:
        </span>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(event) =>
              onSortChange?.(event.target.value)
            }
            aria-label="Sort saved jobs"
            className="appearance-none cursor-pointer bg-transparent text-xs font-medium text-slate-700 dark:text-slate-200 outline-none pr-6 py-1.5 focus:text-blue-600 dark:focus:text-blue-400"
          >
            <option value="recent">Recently Saved</option>
            <option value="oldest">Oldest Saved</option>
            <option value="title">Job Title</option>
          </select>

          <ChevronDown
            size={13}
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
          />
        </div>
      </div>

    </div>
  );
}
