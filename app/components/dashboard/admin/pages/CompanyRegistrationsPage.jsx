"use client";

import React, { useState, useMemo } from "react";
import { Plus, Filter, Clock, CheckCircle2, XCircle, Search } from "lucide-react";

import CompanyRegisterModal from "../../../modals/CompanyRegisterModal";
import DynamicTable from "../../../common/DynamicTable";
import MetricCard from "../MetricCard";

// Dummy Data matching screenshot[cite: 4]
const INITIAL_COMPANIES = [
  {
    id: "cmp_1",
    name: "Nexus Labs",
    initials: "NL",
    email: "sarah.j@nexuslabs.io",
    industry: "Quantum Computing",
    status: "Pending",
    dateSubmitted: "Oct 12, 2023",
  },
  {
    id: "cmp_2",
    name: "Aether Ventures",
    initials: "AV",
    email: "hiring@aetherv.co",
    industry: "Venture Capital",
    status: "Approved",
    dateSubmitted: "Oct 10, 2023",
  },
  {
    id: "cmp_3",
    name: "Flux Tech",
    initials: "FT",
    email: "admin@fluxtech.net",
    industry: "E-commerce",
    status: "Rejected",
    dateSubmitted: "Oct 09, 2023",
  },
  {
    id: "cmp_4",
    name: "Orbital Systems",
    initials: "OS",
    email: "ops@orbital.space",
    industry: "Aerospace",
    status: "Pending",
    dateSubmitted: "Oct 14, 2023",
  },
  {
    id: "cmp_5",
    name: "Solaris Robotics",
    initials: "SR",
    email: "hr@solaris-robotics.com",
    industry: "Robotics",
    status: "Approved",
    dateSubmitted: "Oct 05, 2023",
  },
];

export default function CompanyRegistrationsPage() {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Status mutation handlers
  const handleApprove = (companyId) => {
    setCompanies((prev) =>
      prev?.map((c) => (c?.id === companyId ? { ...c, status: "Approved" } : c))
    );
  };

  const handleReject = (companyId) => {
    setCompanies((prev) =>
      prev?.map((c) => (c?.id === companyId ? { ...c, status: "Rejected" } : c))
    );
  };

  const handleAddCompany = (newCompany) => {
    setCompanies((prev) => [newCompany, ...prev]);
  };

  // Filtered dataset logic
  const filteredCompanies = useMemo(() => {
    return companies?.filter((c) => {
      const matchesSearch =
        c?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        c?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        c?.industry?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || c?.status?.toLowerCase() === statusFilter?.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchQuery, statusFilter]);

  // Dynamic counts for bottom Metric Cards
  const pendingCount = useMemo(
    () => companies?.filter((c) => c?.status?.toLowerCase() === "pending")?.length || 14,
    [companies]
  );
  const approvedCount = useMemo(
    () => companies?.filter((c) => c?.status?.toLowerCase() === "approved")?.length || 892,
    [companies]
  );
  const rejectedCount = useMemo(
    () => companies?.filter((c) => c?.status?.toLowerCase() === "rejected")?.length || 42,
    [companies]
  );

  // Column structure for DynamicTable
  const columns = useMemo(
    () => [
      {
        header: "Company Name",
        accessor: "name",
        sortable: true,
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 uppercase">
              {row?.initials || "CP"}
            </div>
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
              {row?.name}
            </span>
          </div>
        ),
      },
      {
        header: "Recruiter Email",
        accessor: "email",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            {row?.email}
          </span>
        ),
      },
      {
        header: "Industry",
        accessor: "industry",
        sortable: true,
        cell: (row) => (
          <span className="inline-block rounded-md bg-slate-100 dark:bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            {row?.industry}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        sortable: true,
        cell: (row) => {
          const status = row?.status?.toLowerCase();
          return (
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold capitalize ${
                status === "approved"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : status === "pending"
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === "approved"
                    ? "bg-emerald-500"
                    : status === "pending"
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
              />
              {row?.status}
            </span>
          );
        },
      },
      {
        header: "Date Submitted",
        accessor: "dateSubmitted",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {row?.dateSubmitted}
          </span>
        ),
      },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => {
          const status = row?.status?.toLowerCase();

          return (
            <div className="flex items-center gap-2">
              {status !== "approved" && (
                <button
                  type="button"
                  onClick={() => handleApprove(row?.id)}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                >
                  Approve
                </button>
              )}

              {status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => handleReject(row?.id)}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                >
                  Reject
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [companies]
  );

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Company Registrations
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Review and manage corporate entity access requests for the HireLoop ecosystem.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search companies or emails..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e?.target?.value)}
              className="appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <Filter className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Register New Company Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-3.5 py-1.5 text-xs font-semibold text-white dark:text-slate-950 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Register New</span>
          </button>
        </div>
      </div>

      {/* Main Companies Table */}
      <div>
        <DynamicTable
          columns={columns}
          data={filteredCompanies}
          isLoading={isLoading}
          pageSize={10}
          emptyMessage="No company registration requests match your current filters."
        />
      </div>

      {/* Bottom Metric Summary Cards (Matching Mockup Footer[cite: 4]) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <MetricCard
          title="PENDING REVIEW"
          value={pendingCount}
          change="+12% vs last week"
          isNegative={false}
          icon={Clock}
        />
        <MetricCard
          title="APPROVED PARTNERS"
          value={approvedCount}
          change="+5% vs last week"
          isNegative={false}
          icon={CheckCircle2}
        />
        <MetricCard
          title="TOTAL REJECTIONS"
          value={rejectedCount}
          change="Stable"
          isNegative={true}
          icon={XCircle}
        />
      </div>

      {/* Registration Modal */}
      <CompanyRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCompany={handleAddCompany}
      />
    </div>
  );
}