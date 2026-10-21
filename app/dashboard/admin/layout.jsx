"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";
import { getClientUser } from "../../lib/client-session";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const router = useRouter(); // Renamed from 'route' to standard 'router'

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const userData = await getClientUser();
        console.log("Fetched User:", userData);

        if (isMounted) {
          setUser(userData);
          
          // Check authorization after fetching the user
          const userRole = userData?.role?.toLowerCase() || "";
          if (userRole !== "admin") {
            router.push("/unauthorized");
          }
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        if (isMounted) {
          router.push("/unauthorized");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Optional: Render a loading skeleton or null while checking auth to prevent flashing content
  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans antialiased">
      {/* Global Sidebar for all admin/recruiter sub-routes */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}   
        user={user}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
          user={user}
        />

        {/* Dynamic Children Pages */}
        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}