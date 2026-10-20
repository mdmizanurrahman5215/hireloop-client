"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Building2, Briefcase, DollarSign, Calendar, Download } from "lucide-react";
import MetricCard from "./MetricCard";
import DynamicTable from "../../common/DynamicTable";

const METRICS_DATA = [
  { id: 1, title: "Total Users", value: "124,892", change: "+12%", isNegative: false, icon: Users },
  { id: 2, title: "Total Recruiters", value: "12,405", change: "+8%", isNegative: false, icon: Building2 },
  { id: 3, title: "Total Companies", value: "4,281", change: "-2%", isNegative: true, icon: Building2 },
  { id: 4, title: "Jobs Posted", value: "8,920", change: "+24%", isNegative: false, icon: Briefcase },
  { id: 5, title: "Platform Revenue", value: "$245,800", change: "+18.5%", isNegative: false, icon: DollarSign },
];

const CATEGORY_BARS = [
  { label: "Engineering", height: "80%" },
  { label: "Design", height: "60%" },
  { label: "Marketing", height: "45%" },
  { label: "Sales", height: "70%" },
  { label: "Operations", height: "35%" },
];

const TRANSACTIONS_DATA = [
  {
    id: 1,
    user: { initials: "MK", email: "marcus.k@techcorp.io", company: "TechCorp Inc." },
    planType: "Enterprise Monthly",
    transactionId: "#TXN-98231",
    amount: "$1,299.00",
    date: "Oct 24, 2023, 14:32",
    status: "Success",
  },
  {
    id: 2,
    user: { initials: "SL", email: "sarah.l@creativestudio.com", company: "Creative Studio" },
    planType: "Professional Annual",
    transactionId: "#TXN-88203",
    amount: "$499.00",
    date: "Oct 24, 2023, 11:05",
    status: "Success",
  },
  {
    id: 3,
    user: { initials: "JD", email: "j.doe@freelance.org", company: "Independent" },
    planType: "Starter Monthly",
    transactionId: "#TXN-77429",
    amount: "$49.00",
    date: "Oct 23, 2023, 18:45",
    status: "Pending",
  },
  {
    id: 4,
    user: { initials: "RR", email: "admin@retailglobal.net", company: "Retail Global" },
    planType: "Enterprise Monthly",
    transactionId: "#TXN-66304",
    amount: "$1,299.00",
    date: "Oct 23, 2023, 09:12",
    status: "Failed",
  },
];

export default function DashboardOverviewPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Transactions Data columns definition with dual light/dark mode styling
  const columns = useMemo(
    () => [
      {
        header: "User & Company",
        accessor: "user",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {row?.user?.initials || "U"}
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100 text-xs">
                {row?.user?.company || "N/A"}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {row?.user?.email || ""}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Transaction ID",
        accessor: "transactionId",
        sortable: true,
        cell: (row) => (
          <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
            {row?.transactionId}
          </span>
        ),
      },
      {
        header: "Plan Type",
        accessor: "planType",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            {row?.planType}
          </span>
        ),
      },
      {
        header: "Amount",
        accessor: "amount",
        sortable: true,
        cell: (row) => (
          <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
            {row?.amount}
          </span>
        ),
      },
      {
        header: "Date",
        accessor: "date",
        sortable: true,
        cell: (row) => (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {row?.date}
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
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                status === "success"
                  ? "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : status === "pending"
                  ? "border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                  : "border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
              }`}
            >
              {row?.status}
            </span>
          );
        },
      },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/transactions/${row?.id}`}
              className="rounded px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
            >
              View Details
            </Link>

            <Link
              href={`/dashboard/transactions/edit/${row?.id}`}
              className="rounded px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 transition-colors hover:bg-amber-50 dark:hover:bg-amber-950/50"
            >
              Edit
            </Link>

            <button
              type="button"
              onClick={() => handleDeleteTransaction(row)}
              className="rounded px-2 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/50"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleDeleteTransaction = (transaction) => {
    console.log("Deleting transaction:", transaction?.id);
  };

  return (
    <div className="space-y-6">
      {/* Top Page Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Real-time platform performance and growth metrics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 font-semibold px-3 py-1.5 rounded-xl text-xs transition-all shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top Stats Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {METRICS_DATA?.map((metric) => (
          <MetricCard key={metric?.id} {...metric} />
        ))}
      </div>

      {/* Visual Data Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Job Posts by Category</h3>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Active Listings</span>
            </div>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 px-2">
            {CATEGORY_BARS?.map((bar) => (
              <div key={bar?.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-lg p-1 h-full flex items-end border border-slate-200/50 dark:border-none">
                  <div
                    className="w-full bg-slate-400 dark:bg-slate-700 group-hover:bg-blue-600 rounded-md transition-all duration-300"
                    style={{ height: bar?.height }}
                  />
                </div>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium truncate max-w-full">
                  {bar?.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Curve Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">New Users (30d)</h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 px-2 py-0.5 rounded-full">
              +2,410
            </span>
          </div>

          <div className="relative h-40 flex items-center justify-center">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" fill="none">
              <path
                d="M0 80 Q 50 100, 100 60 T 200 70 T 300 10"
                fill="none"
                className="stroke-slate-800 dark:stroke-white"
                strokeWidth="2.5"
              />
              <circle cx="270" cy="20" r="4" className="fill-slate-800 dark:fill-white" />
            </svg>

            {/* Annotation Badge */}
            <div className="absolute top-3 right-8 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              Peak Growth
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <span>Day 1</span>
            <span>Day 15</span>
            <span>Day 30</span>
          </div>
        </div>
      </div>

      {/* Transactions Data Table Component */}
      <div className="mt-6">
        <DynamicTable
          columns={columns}
          data={TRANSACTIONS_DATA}
          isLoading={isLoading}
          pageSize={10}
          emptyMessage="No transactions found matching your criteria."
        />
      </div>
    </div>
  );
}