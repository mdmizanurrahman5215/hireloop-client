"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Plus, Filter, Clock, CheckCircle2, XCircle, Search } from "lucide-react";

import CompanyRegisterModal from "../../../modals/CompanyRegisterModal";
import DynamicTable from "../../../common/DynamicTable";
import MetricCard from "../MetricCard";
import { getCompanies, updateCompanyStatus } from "../../../../lib/actions/companyActions";
import toast from "react-hot-toast";



export default function CompanyRegistrationsPage() {
  const [companies, setCompanies] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load - Server action call
  useEffect(() => {
    async function loadCompanies() {
      try {
        setIsLoading(true);
        const res = await getCompanies();
        console.log({res})
        const data = Array.isArray(res?.data?.companies) ? res?.data?.companies : res?.data || [];
        setCompanies(data);
      } catch (err) {
        console.error("Failed to load companies:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCompanies();
  }, []);
  console.log({companies})
 
const handleApprove = async (companyId) => {
    try {
      const res = await updateCompanyStatus(companyId, "APPROVED");
      console.log("Server Response approved:", res);

    
      const updatedCompany = res?.data?.company || res?.data || (res?.success ? res : null);
console.log("updatedCompany:", updatedCompany);
      if (res?.success || res?.status === 200 || updatedCompany) {
        toast.success("Company approved successfully!");
        
       
        setCompanies((prev) =>
          prev?.map((c) =>
            c?._id === companyId || c?.id === companyId
              ? { ...c, ...(typeof updatedCompany === 'object' ? updatedCompany : {}), status: "APPROVED" }
              : c
          )
        );
      } else {
        toast.error(res?.error || res?.message || "Failed to approve company.");
      }
    } catch (error) {
      console.error("Failed to approve company:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleReject = async (companyId) => {
    try {
      const res = await updateCompanyStatus(companyId, "REJECTED");
      console.log("Server Response REJECTED:", res);

      const updatedCompany = res?.data?.company || res?.data || (res?.success ? res : null);
console.log("updatedCompany:", updatedCompany);

      if (res?.success || res?.status === 200 || updatedCompany) {
        toast.success("Company rejected successfully!");
        
       
        setCompanies((prev) =>
          prev?.map((c) =>
            c?._id === companyId || c?.id === companyId
              ? { ...c, ...(typeof updatedCompany === 'object' ? updatedCompany : {}), status: "REJECTED" }
              : c
          )
        );
      } else {
        toast.error(res?.error || res?.message || "Failed to reject company.");
      }
    } catch (error) {
      console.error("Failed to reject company:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleAddCompany = (newCompany) => {
    setCompanies((prev) => [newCompany, ...prev]);
  };

  // Search & Filtered dataset
  const filteredCompanies = useMemo(() => {
    return companies?.filter((c) => {
      const matchesSearch =
        c?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        c?.userEmail?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        c?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        c?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        c?.status?.toLowerCase() === statusFilter?.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchQuery, statusFilter]);

  // Metric counts
  const pendingCount = useMemo(
    () => companies?.filter((c) => c?.status?.toLowerCase() === "pending")?.length || 0,
    [companies]
  );
  const approvedCount = useMemo(
    () => companies?.filter((c) => c?.status?.toLowerCase() === "approved")?.length || 0,
    [companies]
  );
  const rejectedCount = useMemo(
    () => companies?.filter((c) => c?.status?.toLowerCase() === "rejected")?.length || 0,
    [companies]
  );

  // Table Columns Setup
  const columns = useMemo(
    () => [
      {
        header: "Company Name",
        accessor: "name",
        sortable: true,
        cell: (row) => {
          const initials = row?.name
            ? row.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
            : "CP";

          return (
            <div className="flex items-center gap-3">
              {row?.logo ? (
                <img
                  src={row.logo}
                  alt={row.name}
                  className="h-8 w-8 shrink-0 rounded-lg object-cover border border-slate-300 dark:border-slate-700"
                />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 uppercase">
                  {initials}
                </div>
              )}
              <div>
                <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 block">
                  {row?.name}
                </span>
                {row?.website && (
                  <a
                    href={row.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-blue-500 hover:underline truncate max-w-[150px] block"
                  >
                    {row.website}
                  </a>
                )}
              </div>
            </div>
          );
        },
      },
      {
        header: "Recruiter Email",
        accessor: "userEmail",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            {row?.userEmail || "N/A"}
          </span>
        ),
      },
      {
        header: "Category & Location",
        accessor: "category",
        sortable: true,
        cell: (row) => (
          <div className="flex flex-col gap-0.5">
            <span className="inline-block w-fit rounded-md bg-slate-100 dark:bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
              {row?.category || "Technology"}
            </span>
            <span className="text-[10px] text-slate-500 capitalize">
              {row?.location} • {row?.employeeCount}
            </span>
          </div>
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
        accessor: "createdAt",
        sortable: true,
        cell: (row) => {
          const dateStr = row?.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A";
          return (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {dateStr}
            </span>
          );
        },
      },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => {
          const status = row?.status?.toLowerCase();
          const rowId = row?._id || row?.id;

          return (
            <div className="flex items-center gap-2">
              {status !== "approved" && (
                <button
                  type="button"
                  onClick={() => handleApprove(rowId)}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                >
                  Approve
                </button>
              )}

              {status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => handleReject(rowId)}
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
      {/* Top Header & Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Company Registrations
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Review and manage corporate entity access requests for the HireLoop ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search companies, emails..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>

          {/* Status Filter Dropdown */}
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

          {/* Add Company Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-3.5 py-1.5 text-xs font-semibold text-white dark:text-slate-950 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Register New</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div>
        <DynamicTable
          columns={columns}
          data={filteredCompanies}
          isLoading={isLoading}
          pageSize={10}
          emptyMessage="No company registration requests match your current filters."
        />
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <MetricCard
          title="PENDING REVIEW"
          value={pendingCount}
          change="Awaiting review"
          isNegative={false}
          icon={Clock}
        />
        <MetricCard
          title="APPROVED PARTNERS"
          value={approvedCount}
          change="Active companies"
          isNegative={false}
          icon={CheckCircle2}
        />
        <MetricCard
          title="TOTAL REJECTIONS"
          value={rejectedCount}
          change="Declined"
          isNegative={true}
          icon={XCircle}
        />
      </div>

      {/* Modal */}
      <CompanyRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCompany={handleAddCompany}
      />
    </div>
  );
}