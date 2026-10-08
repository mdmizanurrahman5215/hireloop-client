"use client";

import React from "react";

export default function JobCard({ job, isBookmarked, onBookmarkToggle, onSelect }) {
  // 1. Location Object/String Safe Handling
  const formatLocation = (loc) => {
    if (!loc) return "Unspecified";
    if (typeof loc === "string") return loc;
    if (typeof loc === "object") {
      const parts = [];
      if (loc.city) parts.push(loc.city);
      if (loc.country) parts.push(loc.country);
      return parts.length > 0 ? parts.join(", ") : "Location unavailable";
    }
    return "Unspecified";
  };

  // 2. Salary Object ({ min, max, currency }) / String / Number Safe Formatting
 const formatSalary = (salaryObj, minSal, maxSal) => {
    // ১. যদি job.salary সরাসরি object হয় { min, max, currency }
    if (salaryObj && typeof salaryObj === "object") {
      const currencySymbol =
        salaryObj.currency === "USD" || !salaryObj.currency
          ? "$"
          : `${salaryObj.currency} `;

      if (salaryObj.min && salaryObj.max) {
        return `${currencySymbol}${Number(salaryObj.min).toLocaleString()} - ${currencySymbol}${Number(salaryObj.max).toLocaleString()}/mo`;
      }
      if (salaryObj.min)
        return `${currencySymbol}${Number(salaryObj.min).toLocaleString()}/mo`;
      if (salaryObj.max)
        return `Up to ${currencySymbol}${Number(salaryObj.max).toLocaleString()}/mo`;
    }

   
    if (salaryObj && typeof salaryObj !== "object") {
      return typeof salaryObj === "number"
        ? `$${salaryObj.toLocaleString()}/mo`
        : String(salaryObj);
    }

   
    if (minSal || maxSal) {
      const min = minSal ? `$${Number(minSal).toLocaleString()}` : "";
      const max = maxSal ? `$${Number(maxSal).toLocaleString()}` : "";
      return min && max ? `${min} - ${max}/mo` : min ? `${min}/mo` : `${max}/mo`;
    }

    return "Salary Negotiable";
  };


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const diffInDays = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1d ago";
    if (isNaN(diffInDays)) return "";
    if (diffInDays < 30) return `${diffInDays}d ago`;
    return new Date(dateString).toLocaleDateString();
  };

  const isRemote = job?.isRemote || (typeof job?.type === "string" && job?.type.toLowerCase().includes("remote"));
  const companyName = typeof job?.companyName === "string" ? job.companyName : (typeof job?.company === "string" ? job.company : "Company Confidential");

  return (
    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm hover:shadow-md flex flex-col justify-between gap-4">
      
   
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => onSelect?.(job)}>
          
         
          {job?.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={companyName}
              onError={(e) => {
                
                e.target.style.display = 'none';
              }}
              className="w-11 h-11 rounded-lg object-cover border border-slate-100 dark:border-slate-800"
            />
          ) : (
            <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-base border border-blue-100 dark:border-blue-900/50">
              {companyName.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {typeof job?.title === "string" ? job.title : "Untitled Position"}
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {companyName}
            </p>
          </div>
        </div>

  
        <button
          onClick={() => onBookmarkToggle?.(job?.id || job?._id)}
          title={isBookmarked ? "Remove Bookmark" : "Bookmark Job"}
          className={`p-2 rounded-lg border transition-colors ${
            isBookmarked
              ? "bg-blue-50 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400"
              : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          }`}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 00-2 2v16l9-4 9 4V5a2 2 0 00-2-2H5z" />
          </svg>
        </button>
      </div>

      {/* Badges Row: Location, Job Type, Category, & Remote */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
        {job?.type && typeof job.type === "string" && (
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            {job.type}
          </span>
        )}

        {job?.category && typeof job.category === "string" && (
          <span className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-medium border border-purple-100 dark:border-purple-900/40">
            {job.category}
          </span>
        )}

        {isRemote && (
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-100 dark:border-emerald-900/40">
            🌐 Remote
          </span>
        )}

        <span className="flex items-center gap-1 px-2 py-1 text-slate-500">
          📍 {formatLocation(job?.location)}
        </span>
      </div>

      {/* Footer: Safe Salary Formatting & Posted Date */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-900 dark:text-slate-200 text-sm">
          {formatSalary(job?.salary, job?.minSalary, job?.maxSalary)}
        </span>
        <span className="text-slate-400 dark:text-slate-500">
          {formatDate(job?.createdAt || job?.postedAt)}
        </span>
      </div>
    </div>
  );
}