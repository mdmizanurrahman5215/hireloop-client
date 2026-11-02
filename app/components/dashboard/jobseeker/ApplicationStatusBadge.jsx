
"use client";

import React from "react";

const STATUS_STYLES = {
  applied:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  pending:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  review:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  shortlisted:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  interview:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  rejected:
    "bg-red-500/10 text-red-600 dark:text-red-400",
  offered:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  hired:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function ApplicationStatusBadge({
  status = "Applied",
}) {
  const normalizedStatus = String(status || "Applied")
    .trim()
    .toLowerCase();

  const styles =
    STATUS_STYLES[normalizedStatus] ||
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border border-current/10 px-2 py-1 text-[10px] font-semibold capitalize ${styles}`}
    >
      {status || "Applied"}
    </span>
  );
}
