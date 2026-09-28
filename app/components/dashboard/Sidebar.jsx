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
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

const NAV_ITEMS = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  { id: "my-company", name: "My Company", icon: Building2, href: "/company" },
  { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase, href: "/jobs" },
  {
    id: "applications",
    name: "Applications",
    icon: Users,
    href: "/applications",
  },
  { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar({
  activeTab,
  onSelectTab,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const closeMobileSidebar = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  // Shared Content
  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full p-5">
      <div>
        {/* Brand Logo & Close Button */}
        <div className="flex items-center justify-between px-2 py-3 mb-6">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              H
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Hire<span className="text-indigo-400">Loop</span>
            </span>
          </Link>

          {/* Close button for Mobile Drawer */}
          <button
            onClick={closeMobileSidebar}
            className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg focus:outline-none"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Badge Profile */}
        <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-3.5 mb-6 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-indigo-900/50 border border-indigo-500/30 shrink-0 flex items-center justify-center">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user?.name || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              /* ইমেজ না থাকলে নামের প্রথম অক্ষরটি Capital Letter-এ দেখাবে */
              <span className="text-indigo-300 font-bold text-base select-none">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-white truncate">
              {user?.name}
            </h4>
            <p className="text-[11px] text-gray-400 truncate">{user?.role}</p>
            <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-medium text-amber-400 uppercase tracking-wider">
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
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-gray-400"}
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
      <div className="px-2 pt-4 border-t border-gray-800/60 text-[11px] text-gray-500 flex justify-between items-center">
        <span>© 2026 HireLoop Inc.</span>
        <span className="text-indigo-400 font-medium">v2.4</span>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Permanent Sidebar (Only visible on md screens & above) */}
      <aside className="hidden md:block w-64 h-screen bg-[#0F1117] border-r border-gray-800/80 sticky top-0 shrink-0">
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Sliding Mobile Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#0F1117] border-r border-gray-800/80 shadow-2xl z-50 overflow-y-auto"
            >
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
