"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserPlus, 
  Download, 
  Filter, 
  UserCog, 
  Search 
} from "lucide-react";
import MetricCard from "../MetricCard";
import DynamicTable from "../../../common/DynamicTable";


// Top Metric Cards Summary Data
const USER_METRICS = [
  {
    id: 1,
    title: "Total Active Users",
    value: "12,842",
    change: "+12% vs last month",
    isNegative: false,
    icon: Users,
  },
  {
    id: 2,
    title: "Recruiter Growth",
    value: "843",
    change: "High demand",
    isNegative: false,
    icon: UserCheck,
  },
  {
    id: 3,
    title: "Suspended Accounts",
    value: "124",
    change: "0.8% of total",
    isNegative: true,
    icon: UserX,
  },
  {
    id: 4,
    title: "New Signups (24h)",
    value: "42",
    change: "Steady activity",
    isNegative: false,
    icon: UserPlus,
  },
];

// Initial Dummy User Data (Matching Mockup)
const INITIAL_USERS_DATA = [
  {
    id: "usr_1",
    name: "Jordan Davis",
    initials: "JD",
    avatar: null,
    email: "jordan.davis@example.com",
    role: "Seeker",
    joinDate: "Oct 12, 2023",
    status: "Active",
  },
  {
    id: "usr_2",
    name: "Elena Rodriguez",
    initials: "ER",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    email: "elena.r@talentflow.io",
    role: "Recruiter",
    joinDate: "Sep 28, 2023",
    status: "Active",
  },
  {
    id: "usr_3",
    name: "Marcus Webb",
    initials: "MW",
    avatar: null,
    email: "m.webb@outlook.com",
    role: "Seeker",
    joinDate: "Aug 05, 2023",
    status: "Suspended",
  },
  {
    id: "usr_4",
    name: "Tom Hiddleston",
    initials: "TH",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    email: "t.hiddles@graki-tech.com",
    role: "Recruiter",
    joinDate: "Nov 01, 2023",
    status: "Active",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(INITIAL_USERS_DATA);
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // User action handlers with optional chaining error safety
  const handleRoleToggle = (userId) => {
    setUsers((prevUsers) =>
      prevUsers?.map((u) => {
        if (u?.id === userId) {
          const newRole = u?.role === "Recruiter" ? "Seeker" : "Recruiter";
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleStatusToggle = (userId) => {
    setUsers((prevUsers) =>
      prevUsers?.map((u) => {
        if (u?.id === userId) {
          const newStatus = u?.status === "Active" ? "Suspended" : "Active";
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user permanently?")) {
      setUsers((prevUsers) => prevUsers?.filter((u) => u?.id !== userId));
    }
  };

  // Filtered Users dataset based on Search query & Role dropdown
  const filteredUsers = useMemo(() => {
    return users?.filter((u) => {
      const matchesSearch =
        u?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        u?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesRole =
        roleFilter === "All" || u?.role?.toLowerCase() === roleFilter?.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Dynamic Table Column Configuration
  const columns = useMemo(
    () => [
      {
        header: "User Name",
        accessor: "name",
        sortable: true,
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
              {row?.avatar ? (
                <Image
                  src={row?.avatar}
                  alt={row?.name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <span>{row?.initials || "U"}</span>
              )}
            </div>
            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
              {row?.name}
            </span>
          </div>
        ),
      },
      {
        header: "Email Address",
        accessor: "email",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {row?.email}
          </span>
        ),
      },
      {
        header: "Role",
        accessor: "role",
        sortable: true,
        cell: (row) => {
          const isRecruiter = row?.role?.toLowerCase() === "recruiter";
          return (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
                isRecruiter
                  ? "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  : "border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
              }`}
            >
              <UserCog className="h-3 w-3 opacity-70" />
              {row?.role}
            </span>
          );
        },
      },
      {
        header: "Join Date",
        accessor: "joinDate",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {row?.joinDate}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        sortable: true,
        cell: (row) => {
          const isActive = row?.status?.toLowerCase() === "active";
          return (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                isActive
                  ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                  : "border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isActive ? "bg-emerald-500" : "bg-rose-500"
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
        cell: (row) => {
          const isRecruiter = row?.role?.toLowerCase() === "recruiter";
          const isSuspended = row?.status?.toLowerCase() === "suspended";

          return (
            <div className="flex items-center gap-3 text-xs font-medium">
              <button
                type="button"
                onClick={() => handleRoleToggle(row?.id)}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {isRecruiter ? "Make Seeker" : "Make Recruiter"}
              </button>

              <button
                type="button"
                onClick={() => handleStatusToggle(row?.id)}
                className={
                  isSuspended
                    ? "text-emerald-600 dark:text-emerald-400 hover:underline"
                    : "text-rose-600 dark:text-rose-400 hover:underline"
                }
              >
                {isSuspended ? "Activate" : "Suspend"}
              </button>

              {isSuspended && (
                <button
                  type="button"
                  onClick={() => handleDeleteUser(row?.id)}
                  className="text-slate-500 hover:text-rose-500 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [users]
  );

  return (
    <div className="space-y-6">
      {/* Top Page Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            User Management
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>

          {/* Role Filter Select */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e?.target?.value)}
              className="appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Recruiter">Recruiters</option>
              <option value="Seeker">Seekers</option>
            </select>
            <Filter className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Export Report Action */}
          <button className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-3 py-1.5 text-xs font-semibold text-white dark:text-slate-950 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all">
            <Download className="h-3.5 w-3.5" />
            <span>Export List</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {USER_METRICS?.map((metric) => (
          <MetricCard key={metric?.id} {...metric} />
        ))}
      </div>

      {/* Users Data Table */}
      <div className="mt-6">
        <DynamicTable
          columns={columns}
          data={filteredUsers}
          isLoading={isLoading}
          pageSize={10}
          emptyMessage="No users found matching your search or role filters."
        />
      </div>
    </div>
  );
}