"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import JobSearchHeader from "../common/jobs/JobSearchHeader";
import JobFilterSidebar from "../common/jobs/JobFilterSidebar";
import JobCard from "../common/jobs/JobCard";
import Pagination from "../common/jobs/Pagination";
import toast from "react-hot-toast";
import { getSavedJobs, saveJob } from "../../lib/actions/saved-jobs-action";


export const JOB_CATEGORIES = [
  { id: "Full-time", label: "Full-time", count: "1.2k" },
  { id: "Contract", label: "Contract", count: "432" },
  { id: "Freelance", label: "Freelance", count: "156" },
];

export default function JobsPage({
  jobs = [],
  totalPages = 1,
  errorMsg = "",
  searchQuery = "",
  selectedTypes = ["Full-time"],
  currentPage = 1,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
const [savedJobsLoading, setSavedJobsLoading] = useState(false);

  // URL Query Params Update Helper
  const updateQueryParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Search Action
  const handleSearchSubmit = (val) => {
    updateQueryParams({
      search: val,
      page: "1",
    });
  };

  // Filter Toggle Action
  const handleToggleType = (typeId) => {
    const updatedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter((id) => id !== typeId)
      : [...selectedTypes, typeId];

    updateQueryParams({
      type: updatedTypes.join(","),
      page: "1",
    });
  };

  // Pagination Action
  const handlePageChange = (newPage) => {
    updateQueryParams({
      page: newPage.toString(),
    });
  };
useEffect(() => {
  const fetchSavedJobs = async () => {
    try {
      setSavedJobsLoading(true);

      const response = await getSavedJobs();
      console.log({ response });
      

      if (!response?.success) {
        console.error(
          "Failed to fetch saved jobs:",
          response?.error,
        );
        return;
      }

      // apiRequest response.data contains the backend response.
      const savedJobs = response?.data?.data || [];

      const savedIds = savedJobs.map((item) => item.jobId);

      setBookmarkedIds(savedIds);
    } catch (error) {
      console.error("Fetch saved jobs error:", error);
    } finally {
      setSavedJobsLoading(false);
    }
  };

  fetchSavedJobs();
}, []);
  // Bookmark Toggle


const handleBookmarkToggle = async (jobId) => {
  if (!jobId) {
    toast.error("Invalid job ID.");
    return;
  }

  // Prevent requests before saved jobs finish loading.
  if (savedJobsLoading) {
    return;
  }

  // Prevent duplicate save requests.
  if (bookmarkedIds?.includes(jobId)) {
    toast("This job is already saved.", {
      icon: "🔖",
    });
    return;
  }

  const toastId = toast.loading("Saving job...");

  try {
    const response = await saveJob(jobId);

    if (!response?.success) {
      toast.error(
        response?.error ||
          response?.message ||
          "Failed to save job.",
        { id: toastId },
      );
      return;
    }

    setBookmarkedIds((prev) =>
      prev.includes(jobId) ? prev : [...prev, jobId],
    );

    toast.success(
      response?.message || "Job saved successfully!",
      { id: toastId },
    );
  } catch (error) {
    console.error("Bookmark toggle error:", error);

    toast.error(
      error?.message || "Something went wrong. Please try again.",
      { id: toastId },
    );
  }
};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Search Bar */}
        <JobSearchHeader
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearchSubmit}
        />

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Sidebar Filter */}
          <JobFilterSidebar
            categories={JOB_CATEGORIES}
            selectedTypes={selectedTypes}
            onToggleType={handleToggleType}
          />

          {/* Jobs List Section */}
          <main className="flex-1 w-full space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Found {jobs?.length ?? 0} Professional Jobs
                {isPending && (
                  <span className="text-xs font-normal text-blue-600 dark:text-blue-400 animate-pulse">
                    Updating...
                  </span>
                )}
              </h1>
            </div>

            {/* Error Feedback */}
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}

            {/* Render Job Cards */}
            <div
              className={`space-y-3 transition-opacity duration-200 ${
                isPending ? "opacity-60" : "opacity-100"
              }`}
            >
              {jobs?.map((job, index) => {
                const uniqueKey = job?.id || job?._id || `job-${index}`;
                return (
                  <JobCard
                    key={uniqueKey}
                    job={job}
                    isBookmarked={bookmarkedIds?.includes(job?.id || job?._id)}
                    onBookmarkToggle={handleBookmarkToggle}
                    onSelect={(selectedJob) => {
                      const id = selectedJob?.id || selectedJob?._id;
                      if (id) router?.push(`/jobs/${id}`);
                    }}
                  />
                );
              })}

              {!isPending && jobs?.length === 0 && !errorMsg && (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                  No jobs found matching your criteria.
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {jobs?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}