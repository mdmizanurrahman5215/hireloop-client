"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";

export default function UnauthorizedPage({ userRole = "recruiter" }) {
  const router = useRouter();

  // Determine standard fallback path according to user role
  const getHomePath = () => {
    const role = userRole?.toLowerCase();
    if (role === "admin" || role === "superadmin") return "/dashboard/admin";
    if (role === "recruiter") return "/dashboard/recruiter";
    return "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 text-center shadow-xl relative overflow-hidden"
      >
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-rose-500 rounded-b-full shadow-lg shadow-rose-500/30" />

        {/* Shield Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-6 shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Status Code & Main Title */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-3">
          <Lock className="w-3 h-3" /> Error 403: Forbidden
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Access Restricted
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
          You don't have the necessary administrative permissions or role privileges to view this section on Hireloop.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router?.back?.()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            href={getHomePath()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>

        {/* Bottom Support Text */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500">
          Think this is a mistake? Contact your account manager or{" "}
          <Link
            href="/support"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Hireloop Support
          </Link>
          .
        </div>
      </motion.div>
    </div>
  );
}