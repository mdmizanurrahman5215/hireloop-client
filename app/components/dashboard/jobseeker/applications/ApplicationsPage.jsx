"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

import ApplicationsStats from "@/app/components/dashboard/jobseeker/ApplicationsStats";
import ApplicationsToolbar from "@/app/components/dashboard/jobseeker/ApplicationsToolbar";
import ApplicationDetailsModal from "@/app/components/dashboard/jobseeker/ApplicationDetailsModal";
import DynamicTable from "@/app/components/common/DynamicTable"; // Update path as needed for your project
import { getUserApplications } from "@/app/lib/actions/applicationAction";

const PAGE_SIZE = 5;

// ----------------------------------------------
// Helpers
// ----------------------------------------------

const formatDate = (date) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "N/A";
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getRelativeDate = (date) => {
  if (!date) return "Recently";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Recently";

  const diff = Date.now() - parsedDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;

  return `${Math.floor(days / 30)} months ago`;
};

const capitalizeStatus = (status) => {
  if (!status) return "Applied";
  return String(status)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// ----------------------------------------------
// Normalize API application data
// ----------------------------------------------

const formatApplication = (application) => {
  const job = application?.job || {};
  const company = application?.company || {};

  const jobType =
    job?.jobType?.label ||
    job?.jobType?.value ||
    job?.employmentType ||
    "Not specified";

  const jobLocation = job?.location || {};
  const location = jobLocation?.remote
    ? "Remote"
    : [jobLocation?.city, jobLocation?.country].filter(Boolean).join(", ") ||
      "Location not specified";

  const appliedAt = application?.createdAt || null;
  const companyName =
    company?.name ||
    application?.companyName ||
    job?.companyName ||
    "Company details unavailable";

  return {
    ...application,
    id: String(application?._id || application?.id || ""),
    fullName: application?.fullName || "Unknown Applicant",
    email: application?.email || "",
    phone: application?.phone || "",
    jobTitle: job?.title || application?.jobTitle || "Job details unavailable",
    company: companyName,
    companyInitials: companyName.slice(0, 2).toUpperCase(),
    companyLogo: company?.logo || job?.companyLogo || "",
    employmentType: jobType,
    location,
    status: capitalizeStatus(application?.status),
    appliedAt,
    appliedLabel: getRelativeDate(appliedAt),
    appliedDateLabel: formatDate(appliedAt),
    updatedAt: application?.updatedAt || null,
    resumeUrl: application?.resumeUrl || "",
    experienceUrl: application?.experienceUrl || null,
    experience: application?.experience || "Not specified",
    portfolio: application?.portfolio || "",
    coverLetter: application?.coverLetter || "",
    archived: Boolean(application?.archived),
  };
};

export default function ApplicationsPage({ user }) {
  // ----------------------------------------------
  // State
  // ----------------------------------------------

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // ----------------------------------------------
  // Fetch Applications
  // ----------------------------------------------

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      try {
        setIsLoading(true);

        const userId = user?.id || user?._id;
        if (!userId) {
          if (isMounted) {
            setApplications([]);
            setIsLoading(false);
          }
          return;
        }

        const response = await getUserApplications(String(userId));
        console.log("Fetched applications:", response);

        if (!response?.success) {
          throw new Error(
            response?.error ||
              response?.message ||
              "Failed to load applications."
          );
        }

        const applicationData = response?.data?.applications || [];
        console.log("Fetched applicationData:", applicationData);
        const formattedApplications = Array.isArray(applicationData)
          ? applicationData.map(formatApplication)
          : [];

        if (isMounted) {
          setApplications(formattedApplications);
        }
      } catch (error) {
        console.error("Fetch applications error:", error);
        if (isMounted) {
          toast.error(error?.message || "Failed to load applications.");
          setApplications([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [user?.id, user?._id]);

  // ----------------------------------------------
  // Statistics
  // ----------------------------------------------

  const stats = useMemo(() => {
    const totalApplied = applications.length;

    const shortlisted = applications.filter(
      (item) => item?.status?.toLowerCase() === "shortlisted"
    ).length;

    const interviews = applications.filter(
      (item) => item?.status?.toLowerCase() === "interview"
    ).length;

    const successful = applications.filter((item) =>
      ["offered", "hired"].includes(item?.status?.toLowerCase())
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



  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return applications.filter((application) => {
      const isArchived = Boolean(application?.archived);

      const matchesTab =
        activeTab === "archived" ? isArchived : !isArchived;

      const searchableText = [
        application?.jobTitle,
        application?.company,
        application?.status,
        application?.employmentType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      return matchesTab && matchesSearch;
    });
  }, [applications, activeTab, searchQuery]);

  // ----------------------------------------------
  // Change Tab
  // ----------------------------------------------

  const handleTabChange = (tab) => {
    if (!["active", "archived"].includes(tab)) return;
    setActiveTab(tab);
  };

  // ----------------------------------------------
  // Export PDF
  // ----------------------------------------------

  const handleExport = () => {
    try {
      setIsExporting(true);
      window.print();
    } catch (error) {
      console.error("Application export failed:", error);
      toast.error("Failed to export applications.");
    } finally {
      setIsExporting(false);
    }
  };
  

const columns = useMemo(
  () => [
    {
      header: "Role & Company",
      accessor: "job",
      cell: (row) => {
        console.log("Rendering Role & Company cell for row:", row);
        const jobTitle = row?.job?.title || "Untitled Position";
        const companyName = row?.company|| "Unknown Company";
        const companyLogo = row?.companyLogo;

        const location = [
          row?.job?.location?.city,
          row?.job?.location?.country,
        ]
          .filter(Boolean)
          .map((value) =>
            value.charAt(0).toUpperCase() + value.slice(1)
          )
          .join(", ");

        const companyInitials = companyName
          .split(" ")
          .filter(Boolean)
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-[220px]">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="h-9 w-9 shrink-0 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                {companyInitials || "CP"}
              </div>
            )}

            <div className="min-w-0">
              <p className="font-medium text-slate-900 dark:text-slate-100 text-xs truncate">
                {jobTitle}
              </p>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {companyName}
                {location && ` • ${location}`}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      header: "Employment Type",
      accessor: "jobType",
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
          {row?.job?.jobType?.label ||
            row?.job?.jobType?.value ||
            "Not specified"}
        </span>
      ),
    },

    {
      header: "Applied Date",
      accessor: "createdAt",
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {row?.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Not available"}
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
              status === "offered" || status === "hired"
                ? "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                : status === "interview" || status === "shortlisted"
                ? "border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300"
                : status === "rejected"
                ? "border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                : "border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
            }`}
          >
            {row?.status || "Unknown"}
          </span>
        );
      },
    },

    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedApplication(row)}
            className="rounded px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
          >
            View Details
          </button>
        </div>
      ),
    },
  ],
  []
);




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
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search applications..."
          aria-label="Search applications"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 pl-9 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>

      {/* Dynamic Table Integration */}
      <div className="mt-6">
        <DynamicTable
          columns={columns}
          data={filteredApplications}
          isLoading={isLoading}
          pageSize={PAGE_SIZE}
          emptyMessage={
            searchQuery
              ? "No applications match your search."
              : activeTab === "archived"
              ? "No archived applications found."
              : "You haven't applied for any jobs yet."
          }
        />
      </div>

      {/* Details Modal */}
      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
      />
    </div>
  );
}