
"use client";

import { motion } from "framer-motion";
import { Building2, RefreshCw } from "lucide-react";
import CompanyCard from "./CompanyCard";

export default function CompanyGrid({
  companies = [],
  loading = false,
  error = "",
  onRetry,
  onClearFilters,
}) {
  // Loading state
  if (loading) {
    return (
      <div
        role="status"
        aria-label="Loading companies"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-5 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3 h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="mt-2 h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
            <div className="mt-5 h-8 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
        ))}
        <span className="sr-only">Loading companies...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-900"
      >
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Could not load companies
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error}
        </p>

        {typeof onRetry === "function" && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        )}
      </div>
    );
  }

  // Safely handle missing or invalid data
  const safeCompanies = Array.isArray(companies)
    ? companies.filter(
        (company) => company && typeof company === "object"
      )
    : [];

  // Empty state
  if (safeCompanies.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
        <Building2
          size={32}
          aria-hidden="true"
          className="text-slate-400"
        />

        <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
          No companies found
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
          Try changing your search keywords, industry, or location.
        </p>

        {typeof onClearFilters === "function" && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  // Company grid
  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {safeCompanies.map((company, index) => (
        <CompanyCard
          key={
            company?._id?.toString?.() ||
            company?.id ||
            `company-${index}`
          }
          company={company}
          index={index}
        />
      ))}
    </motion.div>
  );
}
