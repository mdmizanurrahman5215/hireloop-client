"use client";

import { useState, useMemo, useEffect } from "react";

export default function DynamicTable({
  columns = [],
  data = [],
  isLoading = false,
  pageSize = 5,
  emptyMessage = "No data available",
}) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a?.[sortConfig.key];
      const bValue = b?.[sortConfig.key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const comparison =
        typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue));

      return sortConfig.direction === "asc"
        ? comparison
        : -comparison;
    });
  }, [data, sortConfig]);

  // Pagination
  const safePageSize = Math.max(1, Number(pageSize) || 5);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedData.length / safePageSize)
  );

  // Reset page when data changes or the current page becomes invalid
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * safePageSize;
    return sortedData.slice(start, start + safePageSize);
  }, [sortedData, currentPage, safePageSize]);

  const handleSort = (key, sortable) => {
    if (!sortable || !key) return;

    setSortConfig((previous) => ({
      key,
      direction:
        previous.key === key && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));

    setCurrentPage(1);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
          <thead className="border-b border-gray-200 bg-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || column.accessor || `col-${index}`}
                  onClick={() =>
                    handleSort(column.accessor, column.sortable)
                  }
                  className={`px-4 py-3 ${
                    column.sortable
                      ? "cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-700"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {column.header}

                    {column.sortable &&
                      sortConfig.key === column.accessor && (
                        <span aria-label={sortConfig.direction}>
                          {sortConfig.direction === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading data...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id ?? row._id ?? `row-${rowIndex}`}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={
                        column.key ||
                        column.accessor ||
                        `cell-${columnIndex}`
                      }
                      className="px-4 py-3"
                    >
                      {column.cell
                        ? column.cell(row)
                        : row[column.accessor] !== undefined
                          ? row[column.accessor]
                          : "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-gray-800 dark:bg-gray-800/50">
          <span className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(page - 1, 1))
              }
              disabled={currentPage <= 1}
              className="rounded border border-gray-300 bg-white px-3 py-1 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              disabled={currentPage >= totalPages}
              className="rounded border border-gray-300 bg-white px-3 py-1 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}