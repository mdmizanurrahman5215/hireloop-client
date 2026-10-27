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
import { UpdateUserRole } from "../../../../lib/actions/userAction";
 import toast from "react-hot-toast";


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


export default function UserManagementPage({INITIAL_USERS_DATA}) {
  const [users, setUsers] = useState(INITIAL_USERS_DATA);
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // User action handlers with optional chaining error safety


const handleRoleToggle = async (userId, role) => {
  const toastId = toast.loading("Updating user role...");

  try {
    const result = await UpdateUserRole(userId, role);

    if (result?.success === false) {
      toast.error(result.error || "Failed to update user role.", {
        id: toastId,
      });
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, role }
          : user
      )
    );

    toast.success(`User role updated to ${role}.`, {
      id: toastId,
    });
  } catch (error) {
    console.error("Role update failed:", error);

    toast.error("Something went wrong. Please try again.", {
      id: toastId,
    });
  }
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
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-200 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {row?.avatar ? (
              <Image
                src={row.avatar}
                alt={row?.name || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <span>
                {row?.initials ||
                  row?.name
                    ?.trim()
                    .split(/\s+/)
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() ||
                  "U"}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
            {row?.name || "Unknown User"}
          </span>
        </div>
      ),
    },
    {
      header: "Email Address",
      accessor: "email",
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {row?.email || "No email"}
          </span>

          {row?.emailVerified === false && (
            <span className="text-[10px] text-amber-600 dark:text-amber-400">
              Unverified
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
      cell: (row) => {
        const role = row?.role?.toLowerCase() || "jobseeker";

        const roleStyles = {
          admin:
            "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300",
          superadmin:
            "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300",
          recruiter:
            "border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
          jobseeker:
            "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400",
        };

        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
              roleStyles[role] || roleStyles.jobseeker
            }`}
          >
            <UserCog className="h-3 w-3 opacity-70" />
            {role}
          </span>
        );
      },
    },
    {
      header: "Plan",
      accessor: "planId",
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {row?.planId || "No plan"}
        </span>
      ),
    },
    {
      header: "Join Date",
      accessor: "createdAt",
      sortable: true,
      cell: (row) => {
        const date = row?.createdAt
          ? new Date(row.createdAt)
          : null;

        const isValidDate =
          date && !Number.isNaN(date.getTime());

        return (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isValidDate
              ? date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—"}
          </span>
        );
      },
    },
    {
      header: "Subscription",
      accessor: "subscriptionStatus",
      sortable: true,
      cell: (row) => {
        const status =
          row?.subscriptionStatus?.toLowerCase() || "free";

        const isFree = status === "free";
        const isActive = status === "active";

        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
              isActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-400"
                : isFree
                  ? "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-400"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      cell: (row) => {
        // Your current user object has no status field.
        // Do not assume an absent status means suspended.
        const status = row?.status?.toLowerCase() || "unknown";

        const isActive = status === "active";
        const isSuspended = status === "suspended";

        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
              isActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-400"
                : isSuspended
                  ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-400"
                  : "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isActive
                  ? "bg-emerald-500"
                  : isSuspended
                    ? "bg-rose-500"
                    : "bg-slate-400"
              }`}
            />
            {status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => {
        const role = row?.role?.toLowerCase() || "jobseeker";
        const isRecruiter = role === "recruiter";
        const isSuspended =
          row?.status?.toLowerCase() === "suspended";

        // Protect privileged accounts from ordinary role toggles.
        const isPrivileged =
          role === "admin" || role === "superadmin";

        return (
          <div className="flex items-center gap-3 text-xs font-medium">
            {!isPrivileged && (
             <button
  type="button"
  onClick={() =>
    handleRoleToggle(
      row?.id,
      row?.role?.toLowerCase() === "recruiter"
        ? "jobseeker"
        : "recruiter"
    )
  }
  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
>
  {row?.role?.toLowerCase() === "recruiter"
    ? "Make Seeker"
    : "Make Recruiter"}
</button>
            )}

            {!isPrivileged && (
              <button
                type="button"
                onClick={() => handleStatusToggle(row?.id)}
                className={
                  isSuspended
                    ? "text-emerald-600 hover:underline dark:text-emerald-400"
                    : "text-rose-600 hover:underline dark:text-rose-400"
                }
              >
                {isSuspended ? "Activate" : "Suspend"}
              </button>
            )}

            {!isPrivileged && isSuspended && (
              <button
                type="button"
                onClick={() => handleDeleteUser(row?.id)}
                className="text-slate-500 transition-colors hover:text-rose-500"
              >
                Delete
              </button>
            )}
          </div>
        );
      },
    },
  ],
  [users, handleRoleToggle, handleStatusToggle, handleDeleteUser]
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