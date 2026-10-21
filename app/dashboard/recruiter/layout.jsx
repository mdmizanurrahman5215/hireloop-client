"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";

import { authClient } from "../../lib/auth-client";
import UnauthorizedPage from "../../unauthorized/page";
import { useRouter } from "next/navigation";


export default function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const route = useRouter();

  // Client-side authentication session hook
  const { data: session, isPending } = authClient?.useSession?.() || {};
  const user = session?.user;

  // Safely extract normalized user role
  const userRole = user?.role?.toLowerCase() ||  "";

  // 1. Loading Skeleton State while authenticating session
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Verifying recruiter access...</span>
        </div>
      </div>
    );
  }

  // 2. Recruiter Role Authorization Safety Guard
  const isAuthorizedRecruiter =
    userRole === "recruiter";

  if (!isAuthorizedRecruiter) {
    route.push("/unauthorized");
  }

  // 3. Authorized Recruiter Workspace View
  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans antialiased">
      {/* Global Recruiter Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        user={user}
        userType="recruiter"
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Recruiter Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
          user={user}
        />

        {/* Dynamic Recruiter Sub-Pages */}
        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}