
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  MapPin,
  BriefcaseBusiness,
  Bookmark,
  Trash2,
  Clock,
  ExternalLink,
  Building2,
  Banknote,
} from "lucide-react";

// Format salary object into readable text
const formatSalary = (salary) => {
  if (!salary || typeof salary !== "object") {
    return typeof salary === "string" ? salary : "Salary not specified";
  }

  const { min, max, currency } = salary;

  const formatAmount = (amount) =>
    Number(amount).toLocaleString("en-US");

  const currencyLabel = currency || "";

  if (min != null && max != null) {
    return `${formatAmount(min)} - ${formatAmount(max)} ${currencyLabel}`;
  }

  if (min != null) {
    return `From ${formatAmount(min)} ${currencyLabel}`;
  }

  if (max != null) {
    return `Up to ${formatAmount(max)} ${currencyLabel}`;
  }

  return "Salary not specified";
};

export default function SavedJobCard({
  job = {},
  onRemove,
}) {
  const {
    id,
    title = "Untitled Position",
    company = "Unknown Company",
    companyLogo = "",
    location = "Location not specified",
    salary,
    employmentType = "Full-time",
    savedAt = "",
    category = "Other",
    isExpired = false,
    closingSoon = false,
  } = job ?? {};

  const companyInitial =
    company?.charAt?.(0)?.toUpperCase() || "C";

  const formattedDate = savedAt
    ? new Date(savedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Recently";

  const formattedSalary = formatSalary(salary);

  const jobHref = id
    ? `/jobs/${encodeURIComponent(String(id))}`
    : "/jobs";

  const handleRemove = () => {
    if (!id) return;
    onRemove?.(id);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl border p-4 sm:p-5 transition-colors ${
        isExpired
          ? "border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/50 opacity-70"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-slate-700"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

        {/* Company Logo */}
        <div className="w-11 h-11 shrink-0 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={`${company} logo`}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {companyInitial || <Building2 size={19} />}
            </span>
          )}
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={jobHref}
              className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {title}
            </Link>

            {category && (
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[9px] font-semibold uppercase text-slate-500 dark:text-slate-400">
                {category}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {company}
          </p>

          {/* Job Metadata */}
          <div className="mt-3 flex flex-wrap gap-2">

            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] text-slate-600 dark:text-slate-300">
              <MapPin size={11} />
              {location}
            </span>

            {formattedSalary && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] text-slate-600 dark:text-slate-300">
                <Banknote size={11} />
                {formattedSalary}
              </span>
            )}

            {employmentType && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] text-slate-600 dark:text-slate-300">
                <BriefcaseBusiness size={11} />
                {employmentType}
              </span>
            )}

          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex sm:flex-col lg:flex-row items-center justify-between sm:justify-end gap-3 shrink-0">

          <div className="flex items-center gap-2 text-right">

            {isExpired ? (
              <span className="text-[10px] font-medium text-red-500">
                <Clock size={12} className="inline mr-1" />
                Application Closed
              </span>
            ) : closingSoon ? (
              <span className="text-[10px] font-medium text-amber-500">
                <Clock size={12} className="inline mr-1" />
                Closes Soon
              </span>
            ) : (
              <span className="text-[10px] text-slate-400">
                <Clock size={12} className="inline mr-1" />
                Saved {formattedDate}
              </span>
            )}

          </div>

          <div className="flex items-center gap-2">

            {!isExpired && (
              <button
                type="button"
                onClick={handleRemove}
                title="Remove saved job"
                aria-label={`Remove ${title} from saved jobs`}
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Bookmark size={16} />
              </button>
            )}

            {isExpired ? (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-2 text-[11px] font-semibold transition-colors"
              >
                <Trash2 size={13} />
                Remove
              </button>
            ) : (
              <Link
                href={jobHref}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 text-[11px] font-semibold transition-colors"
              >
                Apply Now
                <ExternalLink size={12} />
              </Link>
            )}

          </div>
        </div>

      </div>
    </motion.article>
  );
}
