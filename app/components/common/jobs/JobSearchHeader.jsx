"use client";
import React from "react";

export default function JobSearchHeader({ value = "", onChange, onSearch }) {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-3">
      <div className="relative flex-1">
        <svg
          className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange?.(e?.target?.value)}
          placeholder="Search by job title, keywords..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm dark:shadow-none"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-[0.98] whitespace-nowrap"
      >
        Search Jobs
      </button>
    </form>
  );
}