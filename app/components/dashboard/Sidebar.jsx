"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  Settings,
  CreditCard,
  ChevronRight,
  Sparkles,
  X,
  Sun,
  Moon,
  ShieldCheck,
} from "lucide-react";

// Icon Map for string-based navLinks passed dynamically from props
const ICON_MAP = {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  CreditCard,
  Settings,
};

// Centralized Navigation Config by User Role matching your updated routes
const NAV_CONFIG = {
  recruiter: [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/recruiter" },
    { id: "my-company", name: "My Company", icon: Building2, href: "/dashboard/recruiter/mycompany" },
    { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase, href: "/dashboard/recruiter/jobs" },
    { id: "applications", name: "Applications", icon: Users, href: "/dashboard/recruiter/applications" },
    { id: "settings", name: "Settings", icon: Settings, href: "/dashboard/recruiter/settings" },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
    { id: "users", name: "Users", icon: Users, href: "/dashboard/admin/users" },
    { id: "companies", name: "Companies", icon: Building2, href: "/dashboard/admin/companies" },
    { id: "jobs", name: "Jobs", icon: Briefcase, href: "/dashboard/admin/jobs" },
    { id: "payments", name: "Payments", icon: CreditCard, href: "/dashboard/admin/payments" },
    { id: "settings", name: "Settings", icon: Settings, href: "/dashboard/admin/settings" },
  ],
};

export default function Sidebar({
  activeTab,
  onSelectTab,
  isMobileOpen,
  setIsMobileOpen,
  navLinks = null,
  user,
}) {
  const pathname = usePathname();

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document?.documentElement?.classList?.toggle("dark");
  };

  const closeMobileSidebar = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  // Determine active role normalized to lower-case based on user object
  const currentRole = useMemo(() => {
    const rawRole = user?.role || user?.userType || "recruiter";
    const lowerRole = rawRole?.toString()?.toLowerCase();

    if (lowerRole === "admin" || lowerRole === "superadmin") return "admin";

    return "recruiter";
  }, [user?.role, user?.userType]);

  // Compute active navigation items dynamically
  const activeNavItems = useMemo(() => {
    // 1. Direct navLinks prop override (if array passed from parent layout)
    if (Array.isArray(navLinks) && navLinks?.length > 0) {
      return navLinks?.map((item) => ({
        id: item?.id || item?.label?.toLowerCase(),
        name: item?.name || item?.label,
        href: item?.href || "#",
        icon: typeof item?.icon === "string" ? ICON_MAP[item?.icon] || LayoutDashboard : item?.icon || LayoutDashboard,
      }));
    }

    // 2. Fetch role links from NAV_CONFIG (fallback to recruiter)
    return NAV_CONFIG[currentRole] || NAV_CONFIG.recruiter;
  }, [navLinks, currentRole]);

  // Shared Sidebar Content
  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full p-5 text-slate-800 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 py-3 mb-6">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
              H
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none block">
                Hire<span className="text-blue-600 dark:text-blue-500">Loop</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 capitalize">
                {currentRole} Console
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={closeMobileSidebar}
              className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none transition-colors"
              aria-label="Close Sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* User Profile Badge */}
        <div className="bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-3.5 mb-6 flex items-center gap-3 transition-colors">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center">
            {user?.image || user?.avatar ? (
              <Image
                src={user?.image || user?.avatar}
                alt={user?.name || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-blue-600 dark:text-blue-400 font-bold text-base select-none">
                {user?.name ? user?.name?.charAt(0)?.toUpperCase() : "U"}
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate leading-tight">
              {user?.name || "Hireloop User"}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {user?.email || "Active Session"}
            </p>
            <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {currentRole === "admin" ? (
                <>
                  <ShieldCheck size={10} /> Super Admin
                </>
              ) : (
                <>
                  <Sparkles size={10} /> Premium Recruiter
                </>
              )}
            </div>
          </div>
        </div>

        {/* Role Matched Navigation Menu */}
        <nav className="space-y-1.5">
          {activeNavItems?.map((item) => {
            const Icon = item?.icon || LayoutDashboard;

            // Updated Route matching logic for sub-routes
            const isBaseDashboard = item?.href === "/dashboard/recruiter" || item?.href === "/dashboard/admin";
            const isActive = isBaseDashboard
              ? pathname === item?.href
              : pathname === item?.href || pathname?.startsWith(`${item?.href}/`);

            return (
              <Link
                key={item?.id || item?.href}
                href={item?.href || "#"}
                onClick={() => {
                  if (onSelectTab) onSelectTab(item?.id);
                  closeMobileSidebar();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-500 dark:text-slate-400"
                    }
                  />
                  <span>{item?.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="opacity-80" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="px-2 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-400 dark:text-slate-500 flex justify-between items-center transition-colors">
        <span>© 2026 HireLoop</span>
        <span className="text-blue-600 dark:text-blue-500 font-semibold">v2.4</span>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 sticky top-0 shrink-0 transition-colors">
        <SidebarContent />
      </aside>

      {/* 2. Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="relative z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileSidebar}
              className="fixed inset-0 bg-slate-900/50 dark:bg-black/75 backdrop-blur-sm z-40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 shadow-2xl z-50 overflow-y-auto transition-colors"
            >
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}