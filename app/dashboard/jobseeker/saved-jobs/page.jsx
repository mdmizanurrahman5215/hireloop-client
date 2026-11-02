
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Search,
  BriefcaseBusiness,
} from "lucide-react";

import SavedJobsHeader from
  "@/app/components/dashboard/jobseeker/SavedJobsHeader";

import SavedJobsStats from
  "@/app/components/dashboard/jobseeker/SavedJobsStats";

import SavedJobsToolbar from
  "@/app/components/dashboard/jobseeker/SavedJobsToolbar";

import SavedJobCard from
  "@/app/components/dashboard/jobseeker/SavedJobCard";

// --------------------------------------------------
// Temporary Demo Data
// Replace with your saved jobs API response.
// --------------------------------------------------

const INITIAL_SAVED_JOBS = [
  {
    id: "job-101",
    title: "Senior Product Designer",
    company: "TechFlow",
    companyLogo: "",
    location: "San Francisco, CA (Hybrid)",
    salary: "$95K - $120K + Equity",
    employmentType: "Full-time",
    category: "Product",
    savedAt: "2026-10-31T10:30:00",
    closingSoon: true,
    isExpired: false,
  },
  {
    id: "job-102",
    title: "Frontend Engineer",
    company: "Nexora",
    companyLogo: "",
    location: "Remote, Global",
    salary: "$80K - $110K",
    employmentType: "Full-time",
    category: "Engineering",
    savedAt: "2026-10-30T09:00:00",
    closingSoon: false,
    isExpired: false,
  },
  {
    id: "job-103",
    title: "Staff UX Researcher",
    company: "Nova Labs",
    companyLogo: "",
    location: "New York, NY (On-site)",
    salary: "$110K - $132K",
    employmentType: "Full-time",
    category: "Design",
    savedAt: "2026-10-29T08:00:00",
    closingSoon: true,
    isExpired: false,
  },
  {
    id: "job-104",
    title: "Full Stack Developer",
    company: "Mantis Tech",
    companyLogo: "",
    location: "Austin, TX (Hybrid)",
    salary: "$90K - $120K + Bonus",
    employmentType: "Full-time",
    category: "Engineering",
    savedAt: "2026-10-28T12:00:00",
    closingSoon: true,
    isExpired: false,
  },
  {
    id: "job-105",
    title: "Design Systems Lead",
    company: "Spotify",
    companyLogo: "",
    location: "Remote, USA",
    salary: "",
    employmentType: "Full-time",
    category: "Design",
    savedAt: "2026-10-25T10:00:00",
    closingSoon: false,
    isExpired: true,
  },
];

const ITEMS_PER_PAGE = 4;

export default function SavedJobsPage({
  user = null,
  onMenuClick,
}) {
  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [savedJobs, setSavedJobs] = useState(INITIAL_SAVED_JOBS);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");

  const [sortBy, setSortBy] = useState("recent");

  const [visibleCount, setVisibleCount] = useState(
    ITEMS_PER_PAGE
  );

  // --------------------------------------------------
  // Remove Saved Job
  // --------------------------------------------------

  const handleRemoveSavedJob = (jobId) => {
    if (!jobId) return;

    setSavedJobs((previousJobs) =>
      previousJobs.filter(
        (job) => String(job?.id) !== String(jobId)
      )
    );
  };

  // --------------------------------------------------
  // Search, Filter and Sort
  // --------------------------------------------------

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = [...savedJobs];

    // Search
    if (query) {
      result = result.filter((job) => {
        const searchableText = [
          job?.title,
          job?.company,
          job?.location,
          job?.category,
          job?.employmentType,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    // Category Filter
    if (activeFilter !== "all") {
      result = result.filter(
        (job) =>
          job?.category?.toLowerCase() ===
          activeFilter.toLowerCase()
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "recent") {
        return (
          new Date(b?.savedAt || 0).getTime() -
          new Date(a?.savedAt || 0).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a?.savedAt || 0).getTime() -
          new Date(b?.savedAt || 0).getTime()
        );
      }

      if (sortBy === "title") {
        return (a?.title || "").localeCompare(
          b?.title || ""
        );
      }

      return 0;
    });

    return result;
  }, [savedJobs, searchQuery, activeFilter, sortBy]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const visibleJobs = filteredJobs.slice(
    0,
    visibleCount
  );

  const hasMore = visibleCount < filteredJobs.length;

  const handleLoadMore = () => {
    setVisibleCount((previous) =>
      Math.min(
        previous + ITEMS_PER_PAGE,
        filteredJobs.length
      )
    );
  };

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------

  const closingSoonCount = savedJobs.filter(
    (job) => job?.closingSoon && !job?.isExpired
  ).length;

  return (
    <div className="min-h-full space-y-6">

      {/* ==========================================
          HEADER
      ========================================== */}

      <SavedJobsHeader
        user={user}
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        onMenuClick={onMenuClick}
      />

      {/* ==========================================
          PAGE TITLE AND STATISTICS
      ========================================== */}

      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Saved Jobs
            </h1>

            <Bookmark
              size={21}
              className="text-blue-500"
            />
          </div>

          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Manage and track your bookmarked opportunities.
          </p>
        </div>

        <SavedJobsStats
          totalSaved={24}
          closingSoon={closingSoonCount}
        />

      </section>

      {/* ==========================================
          FILTER AND SORT TOOLBAR
      ========================================== */}

      <SavedJobsToolbar
        activeFilter={activeFilter}
        onFilterChange={(value) => {
          setActiveFilter(value);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* ==========================================
          JOBS LIST
      ========================================== */}

      <section className="space-y-3">

        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {filteredJobs.length} saved opportunities
          </p>

          <p className="text-[10px] text-slate-400">
            Showing {visibleJobs.length} of {filteredJobs.length}
          </p>
        </div>

        <div className="space-y-3">

          <AnimatePresence mode="popLayout">

            {visibleJobs.length > 0 ? (
              visibleJobs.map((job) => (
                <SavedJobCard
                  key={job?.id}
                  job={job}
                  onRemove={handleRemoveSavedJob}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-16 text-center">

                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {searchQuery ? (
                    <Search
                      size={24}
                      className="text-slate-400"
                    />
                  ) : (
                    <Bookmark
                      size={24}
                      className="text-slate-400"
                    />
                  )}
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {searchQuery
                    ? "No matching jobs found"
                    : "No saved jobs yet"}
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {searchQuery
                    ? "Try another keyword or change your category filter."
                    : "Save interesting opportunities to find them here later."}
                </p>

                <Link
                  href="/dashboard/jobseeker/jobs"
                  className="inline-flex items-center gap-2 mt-5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors"
                >
                  <BriefcaseBusiness size={15} />
                  Browse Jobs
                </Link>

              </div>
            )}

          </AnimatePresence>

        </div>

      </section>

      {/* ==========================================
          LOAD MORE
      ========================================== */}

      {hasMore && (
        <div className="flex justify-center pt-2 pb-6">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Load More
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      )}

    </div>
  );
}
