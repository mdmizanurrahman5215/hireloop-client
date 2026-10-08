"use client";
import React from "react";
import Badge from "../ui/Badge";
import BookmarkButton from "../ui/BookmarkButton";

export default function JobDetailHeader({
  job,
  isBookmarked = false,
  onBookmarkToggle,
  onApply
}) {
  const companyInitials = job?.company?.substring?.(0, 2)?.toUpperCase() || "JB";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xl shrink-0 transition-colors">
          {companyInitials}
        </div>
        <div className="space-y-1.5 min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
            {job?.title ?? "Position Title"}
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">{job?.company}</span>
            {job?.verified && (
              <Badge variant="success" className="text-[11px] py-0.5">
                ✓ Verified Employer
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <BookmarkButton
          isBookmarked={isBookmarked}
          onToggle={() => onBookmarkToggle?.(job?.id)}
        />
        <button
          type="button"
          onClick={onApply}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-[0.98]"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}