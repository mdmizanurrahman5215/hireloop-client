
"use client";

import React from "react";
import {
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ApplicationStatusBadge from "./ApplicationStatusBadge";

// --------------------------------------------------
// Desktop Application Row
// --------------------------------------------------

function DesktopApplicationRow({ application, onDetails }) {
  const job = application ?? {};

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">

      {/* Job Title */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-3 min-w-0">

          <div className="w-8 h-8 shrink-0 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
            <span className="text-xs font-bold">
              {job?.jobTitle?.charAt(0)?.toUpperCase() || "J"}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
              {job?.jobTitle || "Untitled Position"}
            </p>

            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {job?.employmentType || "Full-time"}
              {job?.location ? ` • ${job.location}` : ""}
            </p>
          </div>

        </div>
      </td>

      {/* Company */}
      <td className="px-3 py-3">
        <span className="text-xs text-slate-600 dark:text-slate-300">
          {job?.company || "Unknown Company"}
        </span>
      </td>

      {/* Applied Date */}
      <td className="px-3 py-3">
        <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
          {job?.appliedLabel || "Recently"}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <ApplicationStatusBadge status={job?.status} />
      </td>

      {/* Action */}
      <td className="px-3 py-3 text-right">
        <button
          type="button"
          onClick={() => onDetails?.(job)}
          className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Details
        </button>
      </td>

    </tr>
  );
}

// --------------------------------------------------
// Mobile Application Card
// --------------------------------------------------

function MobileApplicationCard({ application, onDetails }) {
  const job = application ?? {};

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">

      <div className="flex items-start gap-3">

        <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <span className="text-sm font-bold">
            {job?.jobTitle?.charAt(0)?.toUpperCase() || "J"}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {job?.jobTitle || "Untitled Position"}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {job?.company || "Unknown Company"}
          </p>
        </div>

        <ApplicationStatusBadge status={job?.status} />

      </div>

      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">

        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {job?.appliedLabel || "Recently"}
        </span>

        <button
          type="button"
          onClick={() => onDetails?.(job)}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

// --------------------------------------------------
// Main Applications Table
// --------------------------------------------------

export default function ApplicationsTable({
  applications = [],
  onDetails,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange,
}) {
  const safeApplications = Array.isArray(applications)
    ? applications
    : [];

  const safeCurrentPage = Math.max(1, Number(currentPage) || 1);

  const safeTotalPages = Math.max(1, Number(totalPages) || 1);

  const safePageSize = Math.max(1, Number(pageSize) || 5);

  const safeTotalItems = Math.max(0, Number(totalItems) || 0);

  const start =
    safeTotalItems > 0
      ? (safeCurrentPage - 1) * safePageSize + 1
      : 0;

  const end = Math.min(
    safeCurrentPage * safePageSize,
    safeTotalItems
  );

  const handlePageChange = (page) => {
    if (!Number.isInteger(page)) return;

    if (page < 1 || page > safeTotalPages) return;

    onPageChange?.(page);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

      {/* ==========================================
          DESKTOP TABLE
      ========================================== */}

      <div className="hidden sm:block overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">

              {[
                "Job Title",
                "Company",
                "Applied",
                "Status",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-3 py-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {safeApplications.map((application, index) => (
              <DesktopApplicationRow
                key={application?.id || application?._id || index}
                application={application}
                onDetails={onDetails}
              />
            ))}

          </tbody>

        </table>

      </div>

      {/* ==========================================
          MOBILE CARDS
          IMPORTANT: Outside the table and tbody
      ========================================== */}

      <div className="sm:hidden p-3 space-y-3">

        {safeApplications.map((application, index) => (
          <MobileApplicationCard
            key={application?.id || application?._id || index}
            application={application}
            onDetails={onDetails}
          />
        ))}

      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {safeApplications.length === 0 && (
        <div className="py-16 px-4 text-center">

          <FileText
            size={28}
            className="mx-auto text-slate-400 mb-3"
          />

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            No applications found
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Your applications will appear here once you apply for a job.
          </p>

        </div>
      )}

      {/* ==========================================
          PAGINATION
      ========================================== */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 px-4 py-3">

        <p className="text-[10px] text-slate-500 dark:text-slate-400">
          Showing {start}-{end} of {safeTotalItems} applications
        </p>

        <div className="flex items-center gap-1">

          <button
            type="button"
            disabled={safeCurrentPage <= 1}
            onClick={() => handlePageChange(safeCurrentPage - 1)}
            aria-label="Previous page"
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from(
            { length: safeTotalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              aria-current={
                safeCurrentPage === page ? "page" : undefined
              }
              className={`min-w-7 h-7 rounded-md text-[11px] font-medium transition-colors ${
                safeCurrentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={safeCurrentPage >= safeTotalPages}
            onClick={() => handlePageChange(safeCurrentPage + 1)}
            aria-label="Next page"
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}
