"use client";

import React, { useState, useMemo } from "react";
import { 
  DollarSign, 
  CreditCard, 
  Users, 
  Building2, 
  Download, 
  Filter, 
  Search, 
  TrendingUp, 
  PieChart 
} from "lucide-react";
import MetricCard from "../MetricCard";
import DynamicTable from "../../../common/DynamicTable";


// Top Stats Metric Cards Summary Data (Matching Mockup)
const PAYMENT_METRICS = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$1,284,500",
    change: "+12.4%",
    isNegative: false,
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Monthly Revenue",
    value: "$94,210",
    change: "+8.1%",
    isNegative: false,
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Active Pro Users",
    value: "12,408",
    change: "+2.3%",
    isNegative: false,
    icon: Users,
  },
  {
    id: 4,
    title: "Active Enterprise Users",
    value: "842",
    change: "+15.7%",
    isNegative: false,
    icon: Building2,
  },
];

// Initial Transactions Dummy Data (Matching Mockup)
const INITIAL_TRANSACTIONS = [
  {
    id: "tx_1",
    userEmail: "jordan.daniels@enterprise.co",
    initials: "JD",
    plan: "Enterprise",
    amount: "$4,500.00",
    date: "May 19, 2026",
    timeAgo: "Just now",
    transactionId: "TXN-982910443",
    status: "SUCCESS",
  },
  {
    id: "tx_2",
    userEmail: "sarah.k@techflow.io",
    initials: "SK",
    plan: "Pro",
    amount: "$299.00",
    date: "May 18, 2026",
    timeAgo: "1 day ago",
    transactionId: "TXN-773410291",
    status: "SUCCESS",
  },
  {
    id: "tx_3",
    userEmail: "marcus.lee@gmail.com",
    initials: "ML",
    plan: "Starter",
    amount: "$49.00",
    date: "May 17, 2026",
    timeAgo: "2 days ago",
    transactionId: "TXN-110784897",
    status: "PENDING",
  },
  {
    id: "tx_4",
    userEmail: "e.lopez@globalfoundries.com",
    initials: "EL",
    plan: "Enterprise",
    amount: "$12,000.00",
    date: "May 10, 2026",
    timeAgo: "9 days ago",
    transactionId: "TXN-009485712",
    status: "FAILED",
  },
];

// Plan Distribution Summary
const PLAN_DISTRIBUTION = [
  { label: "Enterprise", percentage: "35%", width: "w-[35%]", color: "bg-blue-600 dark:bg-blue-500" },
  { label: "Professional", percentage: "52%", width: "w-[52%]", color: "bg-indigo-600 dark:bg-indigo-400" },
  { label: "Starter", percentage: "13%", width: "w-[13%]", color: "bg-slate-400 dark:bg-slate-600" },
];

export default function PaymentsAndSubscriptionsPage() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filtered dataset logic
  const filteredTransactions = useMemo(() => {
    return transactions?.filter((t) => {
      const matchesSearch =
        t?.userEmail?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        t?.transactionId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        t?.plan?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || t?.status?.toUpperCase() === statusFilter?.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  // Column definitions for DynamicTable
  const columns = useMemo(
    () => [
      {
        header: "User Email",
        accessor: "userEmail",
        sortable: true,
        cell: (row) => (
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 uppercase">
              {row?.initials || "U"}
            </div>
            <span className="font-medium text-xs text-slate-900 dark:text-slate-100">
              {row?.userEmail}
            </span>
          </div>
        ),
      },
      {
        header: "Plan",
        accessor: "plan",
        sortable: true,
        cell: (row) => (
          <span className="inline-block rounded-md bg-slate-100 dark:bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            {row?.plan}
          </span>
        ),
      },
      {
        header: "Amount",
        accessor: "amount",
        sortable: true,
        cell: (row) => (
          <span className="font-bold text-xs text-slate-900 dark:text-slate-100 font-mono">
            {row?.amount}
          </span>
        ),
      },
      {
        header: "Date",
        accessor: "date",
        sortable: true,
        cell: (row) => (
          <div>
            <span className="text-xs text-slate-700 dark:text-slate-300 block">
              {row?.date}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {row?.timeAgo}
            </span>
          </div>
        ),
      },
      {
        header: "Transaction ID",
        accessor: "transactionId",
        sortable: true,
        cell: (row) => (
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {row?.transactionId}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        sortable: true,
        cell: (row) => {
          const status = row?.status?.toUpperCase();
          return (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                status === "SUCCESS"
                  ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                  : status === "PENDING"
                  ? "border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                  : "border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === "SUCCESS"
                    ? "bg-emerald-500"
                    : status === "PENDING"
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
              />
              {row?.status}
            </span>
          );
        },
      },
    ],
    [transactions]
  );

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Payments & Subscriptions
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Comprehensive overview of platform revenue and active subscriptions.
          </p>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search email or TXN ID..."
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
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
            <Filter className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Export CSV Button */}
          <button className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-3.5 py-1.5 text-xs font-semibold text-white dark:text-slate-950 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all">
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Stat Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PAYMENT_METRICS?.map((metric) => (
          <MetricCard key={metric?.id} {...metric} />
        ))}
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h3>
        </div>
        <DynamicTable
          columns={columns}
          data={filteredTransactions}
          isLoading={isLoading}
          pageSize={10}
          emptyMessage="No transaction records match your search or filter criteria."
        />
      </div>

      {/* Bottom Visual Data Section (Revenue Trend & Plan Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Revenue Trend (Last 7 Days)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              USD ($)
            </span>
          </div>

          {/* SVG Wave Line Graph Representation */}
          <div className="relative h-44 w-full flex items-center justify-center my-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" fill="none">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,80 Q 75,20 150,60 T 300,40 T 420,15 T 500,50 L 500,120 L 0,120 Z"
                fill="url(#revenueGrad)"
              />
              <path
                d="M 0,80 Q 75,20 150,60 T 300,40 T 420,15 T 500,50"
                fill="none"
                className="stroke-blue-600 dark:stroke-blue-500"
                strokeWidth="2.5"
              />
              <circle cx="420" cy="15" r="4" className="fill-blue-600 dark:fill-blue-400" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>
        </div>

        {/* Plan Distribution Breakdown */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <PieChart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Plan Distribution
              </h3>
            </div>

            <div className="space-y-4">
              {PLAN_DISTRIBUTION?.map((item) => (
                <div key={item?.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{item?.label}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{item?.percentage}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${item?.color} ${item?.width} rounded-full transition-all duration-500`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-6 text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-3 border-t border-slate-100 dark:border-slate-800">
            View detailed report
          </button>
        </div>
      </div>
    </div>
  );
}