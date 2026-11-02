
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CompanyPagination({
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(1, page), totalPages);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      Math.abs(number - safePage) <= 1
  );

  return (
    <nav
      aria-label="Company pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={safePage <= 1}
        onClick={() => onPageChange?.(safePage - 1)}
        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((number, index) => (
        <span key={number} className="contents">
          {index > 0 && pages[index - 1] !== number - 1 && (
            <span className="px-1 text-slate-400">…</span>
          )}

          <button
            type="button"
            aria-label={`Page ${number}`}
            aria-current={number === safePage ? "page" : undefined}
            onClick={() => onPageChange?.(number)}
            className={`min-w-9 rounded-lg border px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              number === safePage
                ? "border-blue-600 bg-blue-600 font-semibold text-white"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {number}
          </button>
        </span>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={safePage >= totalPages}
        onClick={() => onPageChange?.(safePage + 1)}
        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
