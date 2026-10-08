import React from "react";

export default function CompanyOverviewSidebar({ companyInfo }) {
  return (
    <aside className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-6 transition-colors">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
        Company Overview
      </h3>

      {companyInfo?.imageBanner && (
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-36 bg-slate-100 dark:bg-slate-950 transition-colors">
          <img
            src={companyInfo?.imageBanner}
            alt={companyInfo?.name ?? "Company"}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-3 transition-colors">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Size
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            {companyInfo?.size ?? "N/A"}
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-3 transition-colors">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Industry
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[180px] text-right">
            {companyInfo?.industry ?? "N/A"}
          </span>
        </div>
      </div>

      {companyInfo?.websiteUrl && (
        <a
          href={companyInfo?.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 text-sm font-semibold transition-colors"
        >
          Visit Website
        </a>
      )}
    </aside>
  );
}