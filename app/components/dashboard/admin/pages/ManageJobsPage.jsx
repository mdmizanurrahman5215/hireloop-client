"use client";

import React, { useState, useMemo } from "react";
import { Plus, Eye, Trash2, Filter, TrendingUp, Clock, FileText, Search } from "lucide-react";
import DynamicTable from "../../../common/DynamicTable";
import MetricCard from "../MetricCard";
import CreateJobModal from "../../../modals/CreateJobModal";


// Initial Mockup Data matching screenshot[cite: 5]
const INITIAL_JOBS = [
  {
    id: "job_1",
    refId: "Ref: HL-98218",
    title: "Senior Product Designer",
    company: "Nexus Lab",
    companyInitials: "N",
    category: "Design",
    type: "Full-time",
    datePosted: "Oct 24, 2023",
    status: "ACTIVE",
  },
  {
    id: "job_2",
    refId: "Ref: HL-68231",
    title: "Full-stack Engineer",
    company: "Quantum",
    companyInitials: "Q",
    category: "Engineering",
    type: "Contract",
    datePosted: "Oct 22, 2023",
    status: "ACTIVE",
  },
  {
    id: "job_3",
    refId: "Ref: HL-11022",
    title: "Marketing Director",
    company: "Vanguard",
    companyInitials: "V",
    category: "Marketing",
    type: "Full-time",
    datePosted: "Oct 15, 2023",
    status: "CLOSED",
  },
  {
    id: "job_4",
    refId: "Ref: HL-98032",
    title: "Backend Architect",
    company: "CloudScale",
    companyInitials: "C",
    category: "Engineering",
    type: "Remote",
    datePosted: "Oct 20, 2023",
    status: "ACTIVE",
  },
  {
    id: "job_5",
    refId: "Ref: HL-44112",
    title: "UX Research Lead",
    company: "Humanize",
    companyInitials: "H",
    category: "Design",
    type: "Hybrid",
    datePosted: "Oct 19, 2023",
    status: "ACTIVE",
  },
];

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [activeTabStatus, setActiveTabStatus] = useState("all"); // 'all' | 'active' | 'closed'
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusDropdown, setStatusDropdown] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Action Handlers
  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      setJobs((prev) => prev?.filter((j) => j?.id !== jobId));
    }
  };

  const handleAddJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  // Dynamic status tab counts
  const activeJobsCount = useMemo(
    () => jobs?.filter((j) => j?.status?.toUpperCase() === "ACTIVE")?.length || 128,
    [jobs]
  );
  const closedJobsCount = useMemo(
    () => jobs?.filter((j) => j?.status?.toUpperCase() === "CLOSED")?.length || 45,
    [jobs]
  );

  // Filtered dataset logic
  const filteredJobs = useMemo(() => {
    return jobs?.filter((j) => {
      const matchesSearch =
        j?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        j?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        j?.refId?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || j?.category?.toLowerCase() === categoryFilter?.toLowerCase();

      const matchesDropdownStatus =
        statusDropdown === "All" || j?.status?.toUpperCase() === statusDropdown?.toUpperCase();

      const matchesPillTab =
        activeTabStatus === "all" ||
        (activeTabStatus === "active" && j?.status?.toUpperCase() === "ACTIVE") ||
        (activeTabStatus === "closed" && j?.status?.toUpperCase() === "CLOSED");

      return matchesSearch && matchesCategory && matchesDropdownStatus && matchesPillTab;
    });
  }, [jobs, searchQuery, categoryFilter, statusDropdown, activeTabStatus]);

  // Column structure for DynamicTable
  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessor: "title",
        sortable: true,
        cell: (row) => (
          <div>
            <p className="font-semibold text-xs text-slate-900 dark:text-slate-100">
              {row?.title}
            </p>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {row?.refId}
            </p>
          </div>
        ),
      },
      {
        header: "Company",
        accessor: "company",
        sortable: true,
        cell: (row) => (
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 uppercase">
              {row?.companyInitials || "C"}
            </div>
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
              {row?.company}
            </span>
          </div>
        ),
      },
      {
        header: "Category",
        accessor: "category",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {row?.category}
          </span>
        ),
      },
      {
        header: "Type",
        accessor: "type",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-600 dark:text-slate-400">
            {row?.type}
          </span>
        ),
      },
      {
        header: "Date Posted",
        accessor: "datePosted",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {row?.datePosted}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        sortable: true,
        cell: (row) => {
          const isActive = row?.status?.toUpperCase() === "ACTIVE";
          return (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isActive
                  ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                  : "border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isActive ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
              {row?.status}
            </span>
          );
        },
      },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => (
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <button
              type="button"
              title="View Job Details"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteJob(row?.id)}
              title="Delete Listing"
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [jobs]
  );

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Manage Jobs
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Oversee all active listings and historical job posts across the platform.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create Job</span>
        </button>
      </div>

      {/* Filter & Status Pill Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Dropdowns & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={statusDropdown}
              onChange={(e) => setStatusDropdown(e?.target?.value)}
              className="appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="CLOSED">Closed</option>
            </select>
            <Filter className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e?.target?.value)}
              className="appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select>
            <Filter className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search title, company or ref ID..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Status Filter Pill Buttons (Matching Mockup[cite: 5]) */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
          <button
            onClick={() => setActiveTabStatus("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTabStatus === "all"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Jobs
          </button>

          <button
            onClick={() => setActiveTabStatus("active")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTabStatus === "active"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Active ({activeJobsCount})
          </button>

          <button
            onClick={() => setActiveTabStatus("closed")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTabStatus === "closed"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Closed ({closedJobsCount})
          </button>
        </div>
      </div>

      {/* Main Jobs Table */}
      <div>
        <DynamicTable
          columns={columns}
          data={filteredJobs}
          isLoading={isLoading}
          pageSize={10}
          emptyMessage="No job listings match your current filters."
        />
      </div>

      {/* Bottom Engagement Metrics Grid (Matching Mockup Footer[cite: 5]) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <MetricCard
          title="Engagement Rate"
          value="82.4%"
          change="+5.2% from last month"
          isNegative={false}
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg. Time to Fill"
          value="14 Days"
          change="Stable performance"
          isNegative={false}
          icon={Clock}
        />
        <MetricCard
          title="Total Applications"
          value="12,840"
          change="-2.1% across tech sectors"
          isNegative={true}
          icon={FileText}
        />
      </div>

      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}