"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Contract", "Internship"];
const CATEGORIES = [
  "All Categories",
  "Software Development",
  "Design & Creative",
  "Marketing & Sales",
  "Fintech",
  "AI & Data Science",
  "Product Management",
];

export default function JobFilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State initialized from URL query params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [selectedTypes, setSelectedTypes] = useState(
    searchParams.get("type") ? searchParams.get("type").split(",") : []
  );
  const [minSalary, setMinSalary] = useState(searchParams.get("minSalary") || "");
  const [maxSalary, setMaxSalary] = useState(searchParams.get("maxSalary") || "");
  const [isRemoteOnly, setIsRemoteOnly] = useState(searchParams.get("isRemote") === "true");

  // Helper to push updated query params back to Next.js router
  const applyFilters = useCallback(
    (updatedParams) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "" && value !== false) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 whenever filters change
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Search input handler with simple debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get("search") || "")) {
        applyFilters({ search });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, applyFilters, searchParams]);

  // Handle Job Type Checkbox selection
  const handleTypeChange = (type) => {
    let updatedTypes;
    if (selectedTypes.includes(type)) {
      updatedTypes = selectedTypes.filter((t) => t !== type);
    } else {
      updatedTypes = [...selectedTypes, type];
    }
    setSelectedTypes(updatedTypes);
    applyFilters({ type: updatedTypes.join(",") });
  };

  // Handle Category Select
  const handleCategoryChange = (e) => {
    const val = e.target.value === "All Categories" ? "" : e.target.value;
    setCategory(val);
    applyFilters({ category: val });
  };

  // Handle Location Input
  const handleLocationBlur = () => {
    applyFilters({ location });
  };

  // Handle Remote Only Toggle
  const handleRemoteToggle = (e) => {
    const checked = e.target.checked;
    setIsRemoteOnly(checked);
    applyFilters({ isRemote: checked });
  };

  // Handle Salary Range Filter
  const handleSalaryApply = () => {
    applyFilters({ minSalary, maxSalary });
  };

  // Reset all filters to default
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setSelectedTypes([]);
    setMinSalary("");
    setMaxSalary("");
    setIsRemoteOnly(false);
    router.push(pathname);
  };

  return (
    <aside className="w-full lg:w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Filter Jobs</h3>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Reset All
        </button>
      </div>

      {/* 1. Keyword Search */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Search Keyword
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, skill, or company..."
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* 2. Category Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          value={category || "All Categories"}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Job Type Checkboxes */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Job Type
        </label>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-700"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

   
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={handleLocationBlur}
          placeholder="City or country e.g., Dhaka"
          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />

        <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={isRemoteOnly}
            onChange={handleRemoteToggle}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-700"
          />
          <span className="font-medium text-gray-700 dark:text-gray-300">Remote Positions Only</span>
        </label>
      </div>

      {/* 5. Salary Range */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Salary Range ($ / year)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min"
            className="w-1/2 px-3 py-2 text-sm border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Max"
            className="w-1/2 px-3 py-2 text-sm border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <button
          onClick={handleSalaryApply}
          className="w-full mt-2 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-semibold transition"
        >
          Apply Salary Filter
        </button>
      </div>
    </aside>
  );
}