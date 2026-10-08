"use client";

import React from "react";
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
  ChevronRight,
  Sparkles,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

const NAV_ITEMS = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/recruiter",
  },
  { id: "my-company", name: "My Company", icon: Building2, href: "/dashboard/recruiter/mycompany" },
  { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase, href: "/dashboard/recruiter/jobs" },
  {
    id: "applications",
    name: "Applications",
    icon: Users,
    href: "/dashboard/recruiter/applications",
  },
  { id: "settings", name: "Settings", icon: Settings, href: "/dashboard/recruiter/settings" },
];

export default function Sidebar({
  activeTab,
  onSelectTab,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Simple state for local demo, replace with your `next-themes` or global theme state hook if using one.
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    // If using standard Tailwind HTML class-based darkMode ('selector' mode):
    document.documentElement.classList.toggle("dark");
  };

  const closeMobileSidebar = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  // Shared Content Component
  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full p-5 text-slate-800 dark:text-slate-100">
      <div>
        {/* Brand Logo, Theme Toggle & Mobile Close Button */}
        <div className="flex items-center justify-between px-2 py-3 mb-6">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              H
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hire<span className="text-indigo-600 dark:text-indigo-400">Loop</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Close button for Mobile Drawer */}
            <button
              onClick={closeMobileSidebar}
              className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Close Sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* User Badge Profile */}
        <div className="bg-slate-100 dark:bg-[#161B26] border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 mb-6 flex items-center gap-3 transition-colors">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-500/30 shrink-0 flex items-center justify-center">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user?.name || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-indigo-600 dark:text-indigo-300 font-bold text-base select-none">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {user?.name || "Recruiter"}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {user?.role || "Manager"}
            </p>
            <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Sparkles size={10} /> Premium Account
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab
              ? activeTab === item.id
              : pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (onSelectTab) onSelectTab(item.id);
                  closeMobileSidebar();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
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
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="opacity-80" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="px-2 pt-4 border-t border-slate-200 dark:border-slate-800/60 text-[11px] text-slate-400 dark:text-slate-500 flex justify-between items-center transition-colors">
        <span>© 2026 HireLoop Inc.</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-medium">v2.4</span>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Permanent Sidebar */}
      <aside className="hidden md:block w-64 h-screen bg-white dark:bg-[#0F1117] border-r border-slate-200 dark:border-slate-800/80 sticky top-0 shrink-0 transition-colors">
        <SidebarContent />
      </aside>

      {/* 2. Mobile Drawer with Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="relative z-50 md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileSidebar}
              className="fixed inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Sliding Mobile Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#0F1117] border-r border-slate-200 dark:border-slate-800/80 shadow-2xl z-50 overflow-y-auto transition-colors"
            >
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}