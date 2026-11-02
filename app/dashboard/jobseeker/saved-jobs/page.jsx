"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Search,
  BriefcaseBusiness,
} from "lucide-react";
import { toast } from "react-hot-toast";

import SavedJobsHeader from "@/app/components/dashboard/jobseeker/SavedJobsHeader";
import SavedJobsStats from "@/app/components/dashboard/jobseeker/SavedJobsStats";
import SavedJobsToolbar from "@/app/components/dashboard/jobseeker/SavedJobsToolbar";
import SavedJobCard from "@/app/components/dashboard/jobseeker/SavedJobCard";
import { getSavedJobs, removeSavedJob } from "../../../lib/actions/saved-jobs-action";



const ITEMS_PER_PAGE = 4;

export default function SavedJobsPage({
  user = null,
  onMenuClick,
}) {
  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [savedJobs, setSavedJobs] = useState([]);
  const [savedJobsLoading, setSavedJobsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // --------------------------------------------------
  // Fetch Saved Jobs
  // --------------------------------------------------

  useEffect(() => {
    let isMounted = true;

    const fetchSavedJobs = async () => {
      try {
        setSavedJobsLoading(true);

        const response = await getSavedJobs();

        console.log("Saved Jobs API Response:", response);

        if (!response?.success) {
          toast.error(
            response?.error || response?.message || "Failed to load saved jobs."
          );
          return;
        }

    

        const savedJobsData = response?.data?.data || [];
        console.log({ savedJobsData });
        

        // Transform backend response into card-friendly data.
        const formattedJobs = savedJobsData
          .filter((item) => item?.job && item?.jobId)
          .map((item) => {
            const job = item.job;

            return {
              ...job,

              // Use actual job ID, not saved-record ID.
              id: item.jobId,
              jobId: item.jobId,

              // Saved record information.
              savedRecordId: item._id,
              savedAt: item.savedAt,

              // Normalize nested backend objects.
              title: job?.title || "Untitled Job",
              company: job?.companyName || "Unknown Company",
              companyName: job?.companyName || "Unknown Company",
              companyLogo: job?.companyLogo || "",

              location: [
                job?.location?.city,
                job?.location?.country,
              ]
                .filter(Boolean)
                .join(", ") || "Location not specified",

              category:
                job?.category?.label ||
                job?.category?.value ||
                "Other",

              employmentType:
                job?.jobType?.label ||
                job?.jobType?.value ||
                "Not specified",

              isRemote: Boolean(job?.location?.remote),

              salary: job?.salary || null,

              applicationDeadline: job?.applicationDeadline || null,

              // Derived status.
              isExpired: job?.applicationDeadline
                ? new Date(job.applicationDeadline).getTime() < Date.now()
                : false,

              closingSoon: job?.applicationDeadline
                ? (() => {
                    const remainingDays =
                      (new Date(job.applicationDeadline).getTime() -
                        Date.now()) /
                      (1000 * 60 * 60 * 24);

                    return remainingDays >= 0 && remainingDays <= 7;
                  })()
                : false,
            };
          });
            console.log("formattedJobs:", formattedJobs);

        if (isMounted) {
          setSavedJobs(formattedJobs);
        }
      } catch (error) {
        console.error("Fetch saved jobs error:", error);

        if (isMounted) {
          toast.error("Something went wrong while loading saved jobs.");
        }
      } finally {
        if (isMounted) {
          setSavedJobsLoading(false);
        }
      }
    };

    fetchSavedJobs();

    return () => {
      isMounted = false;
    };
  }, []);



  const handleRemoveSavedJob = async (jobId) => {
  if (!jobId) {
    toast.error("Invalid job ID.");
    return;
  }

  const toastId = toast.loading("Removing saved job...");

  try {
    const response = await removeSavedJob(jobId);

    if (!response?.success) {
      toast.error(
        response?.error ||
          response?.message ||
          "Failed to remove saved job.",
        { id: toastId },
      );
      return;
    }

    // Update UI only after successful API response
    setSavedJobs((previousJobs) =>
      previousJobs.filter(
        (job) => String(job?.id) !== String(jobId),
      ),
    );

    toast.success(
      response?.message || "Job removed successfully!",
      { id: toastId },
    );
  } catch (error) {
    console.error("Remove saved job error:", error);

    toast.error("Something went wrong. Please try again.", {
      id: toastId,
    });
  }
};


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
          job?.category?.toLowerCase() === activeFilter.toLowerCase()
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
        return (a?.title || "").localeCompare(b?.title || "");
      }

      return 0;
    });

    return result;
  }, [savedJobs, searchQuery, activeFilter, sortBy]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  console.log("visibleJobs:", visibleJobs);

  const hasMore = visibleCount < filteredJobs.length;

  const handleLoadMore = () => {
    setVisibleCount((previous) =>
      Math.min(previous + ITEMS_PER_PAGE, filteredJobs.length)
    );
  };

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------

  const totalSaved = savedJobs.length;

  const closingSoonCount = savedJobs.filter(
    (job) => job?.closingSoon && !job?.isExpired
  ).length;

  // --------------------------------------------------
  // Reset pagination when filters change
  // --------------------------------------------------

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-full space-y-6">

      {/* HEADER */}

      <SavedJobsHeader
        user={user}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onMenuClick={onMenuClick}
      />

      {/* PAGE TITLE AND STATISTICS */}

      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Saved Jobs
            </h1>

            <Bookmark size={21} className="text-blue-500" />
          </div>

          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Manage and track your bookmarked opportunities.
          </p>
        </div>

        <SavedJobsStats
          totalSaved={totalSaved}
          closingSoon={closingSoonCount}
        />

      </section>

      {/* FILTER AND SORT TOOLBAR */}

      <SavedJobsToolbar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* JOBS LIST */}

      <section className="space-y-3">

        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {savedJobsLoading
              ? "Loading saved jobs..."
              : `${filteredJobs.length} saved opportunities`}
          </p>

          {!savedJobsLoading && (
            <p className="text-[10px] text-slate-400">
              Showing {visibleJobs?.length} of {filteredJobs.length}
            </p>
          )}
        </div>

        <div className="space-y-3">

          {savedJobsLoading ? (

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-16 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Loading your saved jobs...
              </p>
            </div>

          ) : (

            <AnimatePresence mode="popLayout">

              {visibleJobs?.length > 0 ? (

                visibleJobs?.map((job) => (
                  <SavedJobCard
                    key={job.id}
                    job={job}
                    onRemove={handleRemoveSavedJob}
                  />
                ))

              ) : (

                <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-16 text-center">

                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {searchQuery ? (
                      <Search size={24} className="text-slate-400" />
                    ) : (
                      <Bookmark size={24} className="text-slate-400" />
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

                  {!searchQuery && (
                    <Link
                      href="/jobs"
                      className="inline-flex items-center gap-2 mt-5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors"
                    >
                      <BriefcaseBusiness size={15} />
                      Browse Jobs
                    </Link>
                  )}

                </div>

              )}

            </AnimatePresence>

          )}

        </div>

      </section>

      {/* LOAD MORE */}

      {!savedJobsLoading && hasMore && (
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