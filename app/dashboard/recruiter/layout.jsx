"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";

export default function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-[#0B0D13] text-gray-900 dark:text-gray-100 flex font-sans antialiased">
      {/* Global Sidebar for all recruiter sub-routes */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleMobileSidebar={() => setIsMobileOpen(true)}
        />

        {/* Dynamic Children Pages */}
        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}