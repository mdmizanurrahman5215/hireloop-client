"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import DynamicTable from "@/app/components/common/DynamicTable";
import { toast } from "react-hot-toast";

export default function ManageJobsPage({ recruiterCompany, initialJobs, defaultSearch, defaultStatus }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState(initialJobs || []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultSearch || "");
  const [statusFilter, setStatusFilter] = useState(defaultStatus || "all");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      if (statusFilter && statusFilter !== "all") {
        params.set("status", statusFilter);
      } else {
        params.delete("status");
      }

      router.push(`?${params.toString()}`, { scroll: false });
    }, 300); 

    return () => clearTimeout(handler);
  }, [searchTerm, statusFilter, router, searchParams]);

 
  useEffect(() => {
    setJobs(initialJobs || []);
  }, [initialJobs]);

  // Handle Delete Action
  const handleDeleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Job deleted successfully!");
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } else {
        toast.error(data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the job.");
    }
  };

  // Table Column Definitions
  const columns = [
    {
      header: "Job Title",
      accessor: "title",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{row.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.category || "General"}</p>
        </div>
      ),
    },
    {
      header: "Job Type",
      accessor: "jobType",
      sortable: true,
      cell: (row) => (
        <span className="capitalize px-2 py-0.5 text-xs border rounded text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          {row.jobType || "Full-time"}
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
              row.location?.country ? `, ${row.location.country}` : ""
            }`,
    },
    {
      header: "Salary Range",
      accessor: "salary",
      cell: (row) => {
        const currency = row.salary?.currency || "USD";
        const min = row.salary?.min !== undefined ? row.salary.min.toLocaleString() : null;
        const max = row.salary?.max !== undefined ? row.salary.max.toLocaleString() : null;

        if (min && max) return `${currency} ${min} - ${max}`;
        if (min) return `${currency} ${min}+`;
        if (max) return `Up to ${currency} ${max}`;
        return "N/A";
      },
    },
    {
      header: "Deadline",
      accessor: "applicationDeadline",
      sortable: true,
      cell: (row) =>
        row.applicationDeadline
          ? new Date(row.applicationDeadline).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
            row.status === "active"
              ? "bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
              : "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
          }`}
        >
          {row.status}
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
            className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded transition-colors"
          >
            View
          </Link>
          <Link
            href={`/dashboard/jobs/edit/${row._id}`}
            className="px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 rounded transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteJob(row._id)}
            className="px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Manage Jobs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overview of all posted job vacancies for {recruiterCompany?.name || "your company"}.
          </p>
        </div>
        <Link
          href="/dashboard/post-job"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
        >
          + Post New Job
        </Link>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
        />

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="status" className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Filter Status:
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Dynamic Table Integration */}
      <DynamicTable
        columns={columns}
        data={jobs}
        isLoading={isLoading}
        pageSize={10}
        emptyMessage="No job postings found matching your filter criteria."
      />
    </div>
  );
}