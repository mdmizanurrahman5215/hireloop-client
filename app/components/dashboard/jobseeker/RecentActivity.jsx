
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Activity,
  BriefcaseBusiness,
  Mail,
  CircleCheck,
} from "lucide-react";

const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    type: "application",
    title: "Application for Senior Product Designer at TechFlow updated to",
    highlight: "Under Review",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "job",
    title: "New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "message",
    title: "You have a new message from Sarah Jenkins (Hiring Manager at Cloudia).",
    time: "1 day ago",
  },
];

const ACTIVITY_ICONS = {
  application: CircleCheck,
  job: BriefcaseBusiness,
  message: Mail,
};

const ACTIVITY_COLORS = {
  application: "text-blue-500 bg-blue-500/10",
  job: "text-emerald-500 bg-emerald-500/10",
  message: "text-purple-500 bg-purple-500/10",
};

export default function RecentActivity({
  activities = DEFAULT_ACTIVITIES,
}) {
  const safeActivities = Array.isArray(activities)
    ? activities
    : DEFAULT_ACTIVITIES;

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h2>

        <Link
          href="/dashboard/jobseeker/applications"
          className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 underline underline-offset-4"
        >
          View All Activity
        </Link>
      </div>

      <div className="space-y-2.5">

        {safeActivities.length > 0 ? (
          safeActivities.map((activity, index) => {
            const Icon =
              ACTIVITY_ICONS[activity?.type] || Activity;

            const iconColor =
              ACTIVITY_COLORS[activity?.type] ||
              ACTIVITY_COLORS.application;

            return (
              <motion.div
                key={activity?.id ?? index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 sm:p-4"
              >

                <div
                  className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${iconColor}`}
                >
                  <Icon size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activity?.title || "Activity update"}

                    {activity?.highlight && (
                      <span className="ml-1 font-semibold text-amber-600 dark:text-amber-400 underline">
                        {activity.highlight}
                      </span>
                    )}
                  </p>
                </div>

                <span className="text-[10px] sm:text-xs text-slate-400 whitespace-nowrap">
                  {activity?.time || ""}
                </span>

              </motion.div>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <Activity
              size={24}
              className="mx-auto mb-2 text-slate-400"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              No recent activity yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
