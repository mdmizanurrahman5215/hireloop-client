
"use client";

import React, { useEffect, useState } from "react";

import {
  Bookmark,
  FileText,
  CalendarCheck,
  Trophy,
} from "lucide-react";

// import { getClientUser } from "../../lib/client-session";

import DashboardHeader from
  "@/app/components/dashboard/jobseeker/DashboardHeader";

import DashboardStatCard from
  "@/app/components/dashboard/jobseeker/DashboardStatCard";

import DashboardProfileCard from
  "@/app/components/dashboard/jobseeker/DashboardProfileCard";

import ApplicationStatusCard from
  "@/app/components/dashboard/jobseeker/ApplicationStatusCard";

import RecentActivity from
  "@/app/components/dashboard/jobseeker/RecentActivity";

import QuickActionButton from
  "@/app/components/dashboard/jobseeker/QuickActionButton";
import { getClientUser } from "../../lib/client-session";

export default function JobseekerDashboardPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardUser = async () => {
      try {
        const userData = await getClientUser();

        if (isMounted) {
          setUser(userData ?? null);
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard user:",
          error
        );

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // Temporary dashboard statistics.
  // Replace with actual API data later.
  const stats = [
    {
      title: "Saved Jobs",
      value: 12,
      icon: Bookmark,
      color: "blue",
      href: "/dashboard/jobseeker/saved-jobs",
    },
    {
      title: "Applications Submitted",
      value: 24,
      icon: FileText,
      color: "purple",
      href: "/dashboard/jobseeker/applications",
    },
    {
      title: "Interviews Scheduled",
      value: 3,
      icon: CalendarCheck,
      color: "orange",
      href: "/dashboard/jobseeker/applications",
    },
    {
      title: "Offers Received",
      value: 1,
      icon: Trophy,
      color: "green",
      href: "/dashboard/jobseeker/applications",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const firstName = user?.name
    ?.trim()
    ?.split(/\s+/)?.[0] || "Jobseeker";

  return (
    <div className="relative min-h-full space-y-7">

      {/* Dashboard Header */}
      <DashboardHeader
        user={user}
        onMenuClick={() => setIsMobileOpen(true)}
      />

      {/* Welcome Section */}
      <section>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Welcome back, {firstName}!
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here's an overview of your job search progress.
        </p>
      </section>

      {/* Statistics */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <DashboardStatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              href={stat.href}
            />
          ))}
        </div>
      </section>

      {/* Profile and Application Status */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <DashboardProfileCard user={user} />

        <ApplicationStatusCard />

      </section>

      {/* Recent Activity */}
      <section>
        <RecentActivity />
      </section>

      {/* Floating Action */}
      <QuickActionButton />

    </div>
  );
}
