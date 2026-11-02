
"use client";

import React, { useMemo, useState } from "react";
import { Search, FileText } from "lucide-react";

import ApplicationsStats from
  "@/app/components/dashboard/jobseeker/ApplicationsStats";

import ApplicationsToolbar from
  "@/app/components/dashboard/jobseeker/ApplicationsToolbar";

import ApplicationsTable from
  "@/app/components/dashboard/jobseeker/ApplicationsTable";

import ApplicationDetailsModal from
  "@/app/components/dashboard/jobseeker/ApplicationDetailsModal";

// --------------------------------------------------
// Temporary Demo Data
// Replace with your REST API response.
// --------------------------------------------------

const INITIAL_APPLICATIONS = [
  {
    id: "app-101",
    jobTitle: "Senior Frontend Engineer",
    company: "Stark Industries",
    employmentType: "Full-time",
    location: "Remote",
    status: "Applied",
    appliedAt: "2026-10-31T08:00:00",
    appliedLabel: "2 hours ago",
    updatedAt: "2026-10-31T10:00:00",
    archived: false,
  },
  {
    id: "app-102",
    jobTitle: "Product Designer",
    company: "Cyberdyne Systems",
    employmentType: "Contract",
    location: "Hybrid",
    status: "Review",
    appliedAt: "2026-10-30T09:00:00",
    appliedLabel: "1 day ago",
    updatedAt: "2026-10-30T12:00:00",
    archived: false,
  },
  {
    id: "app-103",
    jobTitle: "Lead Data Scientist",
    company: "Wayne Enterprises",
    employmentType: "Full-time",
    location: "On-site",
    status: "Shortlisted",
    appliedAt: "2026-10-28T09:00:00",
    appliedLabel: "4 days ago",
    updatedAt: "2026-10-30T10:00:00",
    archived: false,
  },
  {
    id: "app-104",
    jobTitle: "Cloud Architect",
    company: "Oscorp Tech",
    employmentType: "Full-time",
    location: "Remote",
    status: "Rejected",
    appliedAt: "2026-10-27T09:00:00",
    appliedLabel: "1 week ago",
    updatedAt: "2026-10-29T10:00:00",
    archived: false,
  },
  {
    id: "app-105",
    jobTitle: "AI Research Engineer",
    company: "Hooli Corp",
    employmentType: "Full-time",
    location: "Hybrid",
    status: "Offered",
    appliedAt: "2026-10-17T09:00:00",
    appliedLabel: "2 weeks ago",
    updatedAt: "2026-10-25T10:00:00",
    archived: false,
  },
  {
    id: "app-106",
    jobTitle: "Junior React Developer",
    company: "Tech Solutions",
    employmentType: "Full-time",
    location: "Remote",
    status: "Hired",
    appliedAt: "2026-09-20T09:00:00",
    appliedLabel: "1 month ago",
    updatedAt: "2026-10-01T10:00:00",
    archived: true,
  },
];

const PAGE_SIZE = 5;

const ACTIVE_STATUSES = [
  "applied",
  "pending",
  "review",
  "shortlisted",
  "interview",
  "rejected",
  "offered",
  "hired",
];

export default function ApplicationsPage({
  user = null,
}) {
  // ----------------------------------------------
  // State
  // ----------------------------------------------

  const [applications] = useState(INITIAL_APPLICATIONS);

  const [activeTab, setActiveTab] = useState("active");

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [isExporting, setIsExporting] = useState(false);

  // ----------------------------------------------
  // Statistics
  // ----------------------------------------------

  const stats = useMemo(() => {
    const totalApplied = applications.length;

    const shortlisted = applications.filter(
      (item) =>
        item?.status?.toLowerCase() === "shortlisted"
    ).length;

    const interviews = applications.filter(
      (item) =>
        item?.status?.toLowerCase() === "interview"
    ).length;

    const successful = applications.filter(
      (item) =>
        ["offered", "hired"].includes(
          item?.status?.toLowerCase()
        )
    ).length;

    const successRate = totalApplied
      ? Math.round((successful / totalApplied) * 100)
      : 0;

    return {
      totalApplied,
      shortlisted,
      interviews,
      successRate,
    };
  }, [applications]);

  // ----------------------------------------------
  // Filter and Search
  // ----------------------------------------------

  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return applications.filter((application) => {
      const isArchived = Boolean(application?.archived);

      const matchesTab =
        activeTab === "archived"
          ? isArchived
          : !isArchived;

      const searchableText = [
        application?.jobTitle,
        application?.company,
        application?.status,
        application?.employmentType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesTab && matchesSearch;
    });
  }, [applications, activeTab, searchQuery]);

  // ----------------------------------------------
  // Pagination
  // ----------------------------------------------

  const totalPages = Math.ceil(
    filteredApplications.length / PAGE_SIZE
  );

  const safePage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1)
  );

  const paginatedApplications = filteredApplications.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  // ----------------------------------------------
  // Change Tab
  // ----------------------------------------------

  const handleTabChange = (tab) => {
    if (!["active", "archived"].includes(tab)) return;

    setActiveTab(tab);
    setCurrentPage(1);
  };

  // ----------------------------------------------
  // Export PDF
  // ----------------------------------------------

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Uses the browser print dialog.
      // User can select "Save as PDF".
      window.print();
    } catch (error) {
      console.error("Application export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // ----------------------------------------------
  // Render
  // ----------------------------------------------

  return (
    <div className="space-y-6 min-h-full">

      {/* Page Heading */}
      <section className="flex items-center gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            My Applications
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your job applications and interview progress in real-time.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <ApplicationsStats stats={stats} />

      {/* Toolbar */}
      <ApplicationsToolbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onExport={handleExport}
        isExporting={isExporting}
      />

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search applications..."
          aria-label="Search applications"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 pl-9 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>

      {/* Applications Table */}
      <ApplicationsTable
        applications={paginatedApplications}
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={filteredApplications.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
        onDetails={setSelectedApplication}
      />

      {/* Details Modal */}
      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
      />

    </div>
  );
}
