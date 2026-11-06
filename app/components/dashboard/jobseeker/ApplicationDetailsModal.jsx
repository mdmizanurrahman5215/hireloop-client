
"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Clock,
  UserRound,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  GraduationCap,
  Globe,
  Hash,
  Building2,
} from "lucide-react";

import ApplicationStatusBadge from "./ApplicationStatusBadge";

export default function ApplicationDetailsModal({
  application = null,
  isOpen = false,
  onClose,
}) {

    console.log({application});
    
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const details = application ?? {};
  console.log("Application Details Modal - details:", details);

  const job = details?.job ?? {};
  const company = details?.company ?? {};
  console.log("Application Details Modal - job:", job);
  console.log("Application Details Modal - company:", company);

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getFileUrl = (url) => {
    if (!url) return null;

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    return `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  const location = [
    job?.location?.city,
    job?.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const resumeUrl = getFileUrl(details?.resumeUrl);

  const portfolioUrl = details?.portfolio?.trim()
    ? details.portfolio.trim()
    : null;

  const companyName = company || "Unknown Company";



  return (
    <AnimatePresence>
      {isOpen && application && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="relative w-full max-w-lg max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-5 shrink-0">
              <div>
                <h2
                  id="application-modal-title"
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
                  Application Details
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Review your submitted application information.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6 overflow-y-auto">
              {/* Job & Company */}
              <section>
                <div className="flex items-start gap-3">
                  {details?.companyLogo ? (
                    <img
                      src={details.companyLogo}
                      alt={companyName}
                      className="h-12 w-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {details?.companyInitials || "CP"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {job?.title || "Untitled Position"}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {companyName}
                    </p>

                    {location && (
                      <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-2">
                        <MapPin size={13} />
                        {location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <BriefcaseBusiness
                      size={16}
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Employment Type
                      </p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                        {job?.jobType?.label ||
                          job?.jobType?.value ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Building2
                      size={16}
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Company
                      </p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                        {companyName}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Applicant Information */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <UserRound size={16} className="text-blue-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Applicant Information
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Full Name
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {details?.fullName || "Not available"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex gap-2 min-w-0">
                      <Mail
                        size={15}
                        className="text-blue-500 shrink-0 mt-0.5"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Email
                        </p>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 break-all mt-1">
                          {details?.email || "Not available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Phone
                        size={15}
                        className="text-blue-500 shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Phone
                        </p>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-1">
                          {details?.phone || "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Application Information */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={16} className="text-blue-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Application Information
                  </h3>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Current Status
                  </p>

                  <ApplicationStatusBadge status={details?.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CalendarDays
                      size={16}
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Applied Date
                      </p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                        {formatDate(details?.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock
                      size={16}
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Last Updated
                      </p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                        {formatDate(details?.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <GraduationCap
                      size={16}
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Experience
                      </p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                        {details?.experience || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Resume & Portfolio */}
              {(resumeUrl || portfolioUrl) && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-800" />

                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <ExternalLink size={16} className="text-blue-500" />
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Attachments & Links
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {resumeUrl && (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <FileText size={15} />
                          View Resume
                          <ExternalLink size={12} />
                        </a>
                      )}

                      {portfolioUrl && (
                        <a
                          href={portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Globe size={15} />
                          Portfolio
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </section>
                </>
              )}

              {/* Cover Letter */}
              {details?.coverLetter?.trim() && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-800" />

                  <section>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Cover Letter
                    </p>

                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 whitespace-pre-wrap break-words">
                      {details.coverLetter.trim()}
                    </p>
                  </section>
                </>
              )}

              {/* IDs */}
              {/* <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                {[
                  { label: "Application ID", value: details?._id },
                  {
                    label: "Job ID",
                    value: job?._id || details?.jobId,
                  },
                  {
                    label: "Company ID",
                    value: company?._id || details?.companyId,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-2"
                  >
                    <Hash size={13} className="text-slate-400 mt-0.5" />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                      {item.label}:
                    </p>
                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 break-all">
                      {item.value?.toString() || "Not available"}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex justify-end shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
