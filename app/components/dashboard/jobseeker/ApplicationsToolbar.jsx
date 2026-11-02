
"use client";

import React from "react";
import { Download } from "lucide-react";

export default function ApplicationsToolbar({
  activeTab = "active",
  onTabChange,
  onExport,
  isExporting = false,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">

      <div
        className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-1"
        role="tablist"
        aria-label="Application filters"
      >
        {[
          { label: "Active", value: "active" },
          { label: "Archived", value: "archived" },
        ].map((tab) => {
          const selected = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onTabChange?.(tab.value)}
              className={`rounded-md px-4 py-2 text-xs font-medium transition-colors ${
                selected
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onExport}
        disabled={isExporting}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 text-xs font-semibold text-white transition-colors"
      >
        <Download size={14} />
        {isExporting ? "Preparing..." : "Export PDF"}
      </button>

    </div>
  );
}
