
"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";

import ApplicationStatusBadge from "./ApplicationStatusBadge";

export default function ApplicationDetailsModal({
  application = null,
  isOpen = false,
  onClose,
}) {
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

  return (
    <AnimatePresence>
      {isOpen && application && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
          >

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-5">

              <div>
                <h2
                  id="application-modal-title"
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
                  Application Details
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Review your application information.
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

            <div className="p-5 space-y-5">

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Position
                </p>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {details?.jobTitle || "Untitled Position"}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {details?.company || "Unknown Company"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Current Status
                </p>

                <ApplicationStatusBadge
                  status={details?.status}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {[
                  {
                    label: "Employment Type",
                    value: details?.employmentType,
                    icon: BriefcaseBusiness,
                  },
                  {
                    label: "Location",
                    value: details?.location,
                    icon: MapPin,
                  },
                  {
                    label: "Applied Date",
                    value: formatDate(details?.appliedAt),
                    icon: CalendarDays,
                  },
                  {
                    label: "Last Updated",
                    value: formatDate(details?.updatedAt),
                    icon: Clock,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex gap-3">
                      <Icon
                        size={17}
                        className="text-blue-500 shrink-0 mt-0.5"
                      />

                      <div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.label}
                        </p>

                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                          {item.value || "Not specified"}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>

              {details?.coverLetter && (
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Cover Letter
                  </p>

                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 whitespace-pre-wrap">
                    {details.coverLetter}
                  </p>
                </div>
              )}

            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-semibold text-white"
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
