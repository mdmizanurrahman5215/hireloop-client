"use client";
import React, { useState } from "react";
import JobHeaderBanner from "../common/jobs/jobDetails/JobHeaderBanner";
import JobQuickMetrics from "../common/jobs/jobDetails/JobQuickMetrics";
import JobRequirementsList from "../common/jobs/jobDetails/JobRequirementsList";
import JobBenefitsGrid from "../common/jobs/jobDetails/JobBenefitsGrid";
import CompanyOverviewCard from "../cards/CompanyOverviewCard";
import JobApplicationModal from "../modals/JobApplicationModal";

export default function JobDetailsPage({ job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplySubmit = async (formData) => {
    console.log("Submitted Application Data:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1200));
  };

  // 1. Safe helper to format Location (handles strings or { city, country, remote })
  const formatLocation = (loc) => {
    if (!loc) return "Not specified";
    if (typeof loc === "string") return loc;
    if (typeof loc === "object") {
      const parts = [loc.city, loc.country].filter(Boolean);
      const locationText = parts.join(", ");
      if (loc.remote) {
        return locationText ? `${locationText} (Remote)` : "Remote";
      }
      return locationText || "Not specified";
    }
    return "Not specified";
  };

  // 2. Safe helper to format Salary (handles numbers, strings, or { min, max, currency })
  const formatSalary = (salary) => {
    if (!salary) return "Negotiable";
    if (typeof salary === "string" || typeof salary === "number") return salary;
    if (typeof salary === "object") {
      const { min, max, currency = "$" } = salary;
      if (min && max) return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
      if (min) return `From ${currency}${min.toLocaleString()}`;
      if (max) return `Up to ${currency}${max.toLocaleString()}`;
    }
    return "Negotiable";
  };

  // 3. Safe helper to convert lists/objects into clean renderable arrays
  const normalizeToList = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      return data.split("\n").filter((item) => item.trim().length > 0);
    }
    if (typeof data === "object") {
      return Object.values(data).filter(
        (val) => typeof val === "string" || typeof val === "number"
      );
    }
    return [];
  };

  const responsibilitiesList = normalizeToList(job?.responsibilities);
  const requirementsList =
    normalizeToList(job?.requirementsList) || normalizeToList(job?.requirements);

  // 4. Normalized metrics object guarantees only primitive values (strings/numbers)
  const formattedMetrics = {
    location: formatLocation(job?.location || job?.metrics?.location),
    jobType: job?.jobType || job?.type || job?.metrics?.jobType || "Full-time",
    experience: job?.experience || job?.metrics?.experience || "Not specified",
    salary: formatSalary(job?.salary || job?.metrics?.salary),
  };

  // Safe string location pass for JobHeaderBanner
  const safeJobHeader = {
    ...job,
    location: formatLocation(job?.location),
    salary: formatSalary(job?.salary),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <JobHeaderBanner
          job={safeJobHeader}
          onApplyClick={() => setIsModalOpen(true)}
        />

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Metrics Bar (Safe) */}
            <JobQuickMetrics metrics={formattedMetrics} />

            {/* Main Content Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm dark:shadow-xl">
              {/* Job Description */}
              {job?.description && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Job Description
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {typeof job.description === "string"
                      ? job.description
                      : JSON.stringify(job.description)}
                  </p>
                </div>
              )}

              {/* Responsibilities */}
              {responsibilitiesList.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Responsibilities
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {responsibilitiesList.map((item, index) => (
                      <li
                        key={index}
                        className="marker:text-slate-400 dark:marker:text-slate-500"
                      >
                        {typeof item === "object" ? JSON.stringify(item) : item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements & Skills */}
              <JobRequirementsList
                skills={job?.skills || job?.tags}
                bulletPoints={requirementsList}
              />

              {/* Benefits */}
              <JobBenefitsGrid benefits={job?.benefits} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <CompanyOverviewCard company={job?.company || job} />
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobData={{
          title: job?.title,
          company: job?.companyName || job?.company?.name,
        }}
        onSubmitApi={handleApplySubmit}
      />
    </div>
  );
}