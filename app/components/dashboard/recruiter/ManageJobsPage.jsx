
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import DynamicTable from "@/app/components/common/DynamicTable";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import { toast } from "react-hot-toast";
import { deleteJob } from "../../../lib/actions/jobActions";

export default function ManageJobsPage({
  recruiterCompany,
  initialJobs,
  defaultSearch,
  defaultStatus,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchParamsString = searchParams.toString();

  const searchTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);

  const [jobs, setJobs] = useState(initialJobs || []);
  const [isLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState(defaultSearch || "");
  const [statusFilter, setStatusFilter] = useState(
    defaultStatus || "all"
  );

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Keep jobs synchronized with server-provided data.
  useEffect(() => {
    setJobs(initialJobs || []);
  }, [initialJobs]);

  // Cancel any pending search/filter URL update.
  const cancelPendingNavigation = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
  };

  // Debounced URL synchronization.
  useEffect(() => {
    // Do not start a competing navigation after a View/Edit click.
    if (isNavigatingRef.current) return;

    cancelPendingNavigation();

    searchTimeoutRef.current = setTimeout(() => {
      if (isNavigatingRef.current) return;

      const params = new URLSearchParams(searchParamsString);

      const normalizedSearch = searchTerm.trim();

      if (normalizedSearch) {
        params.set("search", normalizedSearch);
      } else {
        params.delete("search");
      }

      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      } else {
        params.delete("status");
      }

      const nextQuery = params.toString();

      // Prevent unnecessary navigation.
      if (nextQuery === searchParamsString) {
        searchTimeoutRef.current = null;
        return;
      }

      const nextUrl = nextQuery
        ? `${pathname}?${nextQuery}`
        : pathname;

      searchTimeoutRef.current = null;

      router.replace(nextUrl, { scroll: false });
    }, 300);

    return () => {
      cancelPendingNavigation();
    };
  }, [
    searchTerm,
    statusFilter,
    pathname,
    router,
    searchParamsString,
  ]);

  // Prevent the search effect from competing with a link navigation.
  const handlePageNavigation = () => {
    cancelPendingNavigation();
    isNavigatingRef.current = true;
  };

  // DELETE FLOW
  const promptDeleteJob = (job) => {
    setJobToDelete(job);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete || isDeleting) return;

    setIsDeleting(true);

    try {
      const data = await deleteJob(jobToDelete._id);

      if (data?.success) {
        toast.success("Job deleted successfully!");

        setJobs((previousJobs) =>
          previousJobs.filter(
            (job) => job._id !== jobToDelete._id
          )
        );

        setDeleteModalOpen(false);
        setJobToDelete(null);
      } else {
        toast.error(data?.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the job.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        header: "Job Title",
        accessor: "title",
        sortable: true,
        cell: (row) => (
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {row.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {row?.category?.label || row?.category || "General"}
            </p>
          </div>
        ),
      },
      {
        header: "Job Type",
        accessor: "jobType",
        sortable: true,
        cell: (row) => (
          <span className="capitalize rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {row?.jobType?.label || row?.jobType || "Full-time"}
          </span>
        ),
      },
      {
        header: "Location",
        accessor: "location",
        cell: (row) =>
          row.location?.remote
            ? "Remote"
            : `${row.location?.city || "N/A"}${
                row.location?.country
                  ? `, ${row.location.country}`
                  : ""
              }`,
      },
      {
        header: "Salary Range",
        accessor: "salary",
        cell: (row) => {
          const currency = row.salary?.currency || "USD";
          const min = row.salary?.min;
          const max = row.salary?.max;

          const formatSalary = (value) =>
            Number(value).toLocaleString("en-US");

          if (min != null && max != null) {
            return `${currency} ${formatSalary(min)} - ${formatSalary(max)}`;
          }

          if (min != null) {
            return `${currency} ${formatSalary(min)}+`;
          }

          if (max != null) {
            return `Up to ${currency} ${formatSalary(max)}`;
          }

          return "N/A";
        },
      },
      {
        header: "Deadline",
        accessor: "applicationDeadline",
        sortable: true,
        cell: (row) => {
          if (!row.applicationDeadline) return "N/A";

          const date = new Date(row.applicationDeadline);

          if (Number.isNaN(date.getTime())) return "N/A";

          return date.toLocaleDateString("en-GB", {
            timeZone: "UTC",
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        },
      },
      {
        header: "Status",
        accessor: "status",
        sortable: true,
        cell: (row) => (
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
              row.status === "active"
                ? "border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-300"
                : "border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-300"
            }`}
          >
            {row.status || "inactive"}
          </span>
        ),
      },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <Link
              href={`/jobs/${row._id}`}
              onClick={handlePageNavigation}
              className="rounded px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50"
            >
              View
            </Link>

            <Link
              href={`/dashboard/recruiter/jobs/new?redirect=edit/${row._id}`}
              onClick={handlePageNavigation}
              className="rounded px-2 py-1 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/50"
            >
              Edit
            </Link>

            <button
              type="button"
              onClick={() => promptDeleteJob(row)}
              className="rounded px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Manage Jobs
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overview of all posted job vacancies for{" "}
            {recruiterCompany?.name || "your company"}.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          onClick={handlePageNavigation}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          + Post New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:flex-row">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:ring-blue-400 sm:w-80"
        />

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <label
            htmlFor="status"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Filter Status:
          </label>

          <select
            id="status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <DynamicTable
        columns={columns}
        data={jobs}
        isLoading={isLoading}
        pageSize={10}
        emptyMessage="No job postings found matching your filter criteria."
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          if (isDeleting) return;
          setDeleteModalOpen(false);
          setJobToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Job Posting"
        message={`Are you sure you want to delete "${
          jobToDelete?.title || "this job"
        }"? This action cannot be undone.`}
        confirmText="Delete Job"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
