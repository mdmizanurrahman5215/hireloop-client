"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";
import StatCard from "@/app/components/dashboard/StatCard";
import RecentApplications from "@/app/components/dashboard/RecentApplications";
import TopCompanies from "@/app/components/dashboard/TopCompanies";
import QuickActionButton from "@/app/components/dashboard/QuickActionButton";
import { motion } from "motion/react";

import {
  FileText,
  Users,
  Zap,
  CheckCircle2,
  Globe,
  Layers,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

// Mock Data
const MOCK_STATS = [
  { id: 1, title: "Total Job Posts", value: "48", icon: FileText },
  { id: 2, title: "Total Applicants", value: "1,284", icon: Users },
  { id: 3, title: "Active Jobs", value: "18", icon: Zap },
  { id: 4, title: "Jobs Closed", value: "32", icon: CheckCircle2 },
];

const MOCK_APPLICATIONS = [
  {
    id: "1",
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "2",
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "3",
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "4",
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
];

const MOCK_COMPANIES = [
  {
    id: "1",
    name: "Google Inc.",
    category: "Technology",
    location: "Mountain View",
    activeJobs: 24,
    color: "#4285F4",
    icon: Globe,
  },
  {
    id: "2",
    name: "Meta Platforms",
    category: "Social Media",
    location: "Menlo Park",
    activeJobs: 18,
    color: "#0668E1",
    icon: Layers,
  },
  {
    id: "3",
    name: "Stripe",
    category: "Fintech",
    location: "San Francisco",
    activeJobs: 12,
    color: "#635BFF",
    icon: ShieldCheck,
  },
  {
    id: "4",
    name: "Tesla",
    category: "Automotive",
    location: "Austin",
    activeJobs: 31,
    color: "#E82127",
    icon: Flame,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Mobile Sidebar control state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Filter Applications based on search query
  const filteredApplications = MOCK_APPLICATIONS.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const nameText = user?.name || "User";
  return (
    <div className="min-h-screen bg-[#0B0D13] text-gray-100 flex font-sans antialiased">
      {/* Sidebar Component with mobile open state */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Dashboard Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Component with Mobile Toggle Callback */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleMobileSidebar={() => setIsMobileOpen(true)}
        />

        {/* Content Body */}
        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="space-y-1">
            <h3 className="flex flex-wrap items-center gap-x-2 text-xl sm:text-3xl font-extrabold tracking-tight text-white">
              <span>Welcome back,</span>

              <motion.span
                className="inline-block text-cyan-300 font-black"
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  textShadow: [
                    "0 0 0px rgba(34,211,238,0)",
                    "0 0 12px rgba(34,211,238,0.45)",
                    "0 0 6px rgba(34,211,238,0.2)",
                  ],
                }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                  y: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  textShadow: {
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                }}
              >
                {nameText}
              </motion.span>
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Here is what is happening with your hiring pipelines today.
            </p>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_STATS.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>

          {/* Applications and Top Companies Container */}
          <div className="flex flex-col lg:flex-row gap-6">
            <RecentApplications applications={filteredApplications} />
            <TopCompanies companies={MOCK_COMPANIES} />
          </div>
        </main>

        {/* Floating Quick Action Button Component */}
        <QuickActionButton onClick={() => alert("Add Job Modal Opened!")} />
      </div>
    </div>
  );
}
