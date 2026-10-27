
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback } from "react";

const ServerErrorPage = () => {
  const handleRetry = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to reload the page:", error);
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-labelledby="server-error-title"
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-10 w-10 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.3 3.86 2.8 17a2 2 0 0 0 1.74 3h14.92a2 2 0 0 0 1.74-3l-7.46-13.14a2 2 0 0 0-3.44 0Z"
            />
          </svg>
        </motion.div>

        <p className="mb-2 text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-400">
          ERROR 500
        </p>

        <h1
          id="server-error-title"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Something went wrong
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          We’re having trouble processing your request right now.
          Our team may already be looking into it. Please try again
          in a moment.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:focus-visible:ring-offset-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7v5h-5M4 17v-5h5m-4.5-3A8 8 0 0 1 18 6l2 6M4 12l2 6a8 8 0 0 0 12.5-1"
              />
            </svg>
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Sorry for the inconvenience. Thank you for your patience.
        </p>
      </motion.section>
    </main>
  );
};

export default ServerErrorPage;
