
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, RefreshCw } from "lucide-react";

import CompanyCard from "@/components/companies/CompanyCard";
import CompanyFilters from "@/components/companies/CompanyFilters";
import CompanyPagination from "@/components/companies/CompanyPagination";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const PAGE_SIZE = 6;

export default function BrowseCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    industry: null,
    location: null,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCompanies = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      // Adjust this URL to match your existing Express route.
      const response = await fetch(
        `${API_BASE_URL}/api/companies?status=APPROVED`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          signal,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "The companies API endpoint was not found."
            : "Unable to load companies. Please try again."
        );
      }

      const result = await response.json();

      // Supports common API response structures.
      const records = Array.isArray(result)
        ? result
        : Array.isArray(result?.companies)
          ? result.companies
          : Array.isArray(result?.data)
            ? result.data
            : null;

      if (!records) {
        throw new Error("The server returned an invalid companies response.");
      }

      // Only approved companies are public on this page.
      const approvedCompanies = records.filter(
        (company) =>
          String(company?.status || "").toUpperCase() === "APPROVED"
      );

      setCompanies(approvedCompanies);
    } catch (err) {
      if (err?.name === "AbortError") return;

      console.error("Failed to load companies:", err);
      setError(
        err?.message || "Something went wrong while loading companies."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadCompanies(controller.signal);

    return () => controller.abort();
  }, [loadCompanies]);

  const filteredCompanies = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return companies.filter((company) => {
      const searchableText = [
        company?.name,
        company?.category,
        company?.location,
        company?.employeeCount,
        company?.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesIndustry =
        !filters.industry ||
        company?.category?.toLowerCase() ===
          filters.industry.value.toLowerCase();

      const matchesLocation =
        !filters.location ||
        company?.location?.toLowerCase() ===
          filters.location.value.toLowerCase();

      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [companies, filters]);

  const totalPages = Math.ceil(filteredCompanies.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));

  const visibleCompanies = filteredCompanies.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  function handleFiltersChange(values) {
    setFilters({
      search: values?.search || "",
      industry: values?.industry || null,
      location: values?.location || null,
    });
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Reusable navigation can replace this header. */}
        <header className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <Link
            href="/"
            aria-label="Hireloop home"
            className="text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="text-blue-600 dark:text-blue-400">hire</span>
            loop<span className="text-blue-600 dark:text-blue-400">.</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 text-sm text-slate-600 dark:text-slate-400 md:flex"
          >
            <Link href="/jobs" className="hover:text-blue-600 dark:hover:text-blue-400">
              Browse Jobs
            </Link>
            <Link
              href="/companies"
              aria-current="page"
              className="font-medium text-blue-600 dark:text-blue-400"
            >
              Companies
            </Link>
            <Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400">
              Pricing
            </Link>
            <Link href="/signin" className="hover:text-blue-600 dark:hover:text-blue-400">
              Sign In
            </Link>
          </nav>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            Get Started
          </Link>
        </header>

        <section className="mx-auto mt-9 max-w-6xl">
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Building2 size={15} />
              <span>Explore organizations</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Browse Companies
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Discover companies hiring on Hireloop. Explore their industries,
              locations, and company profiles to find your next opportunity.
            </p>
          </div>

          <CompanyFilters
            onFiltersChange={handleFiltersChange}
            resultCount={filteredCompanies.length}
          />

          <section aria-label="Company results" className="mt-6">
            {loading ? (
              <div
                role="status"
                aria-live="polite"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="h-64 animate-pulse rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-5 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-4 h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="mt-2 h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
                  </div>
                ))}
                <span className="sr-only">Loading companies...</span>
              </div>
            ) : error ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-900"
              >
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Could not load companies
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={() => loadCompanies()}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <RefreshCw size={14} />
                  Try again
                </button>
              </div>
            ) : visibleCompanies.length > 0 ? (
              <>
                <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
                  Showing {visibleCompanies.length} of{" "}
                  {filteredCompanies.length} companies
                </p>

                <motion.div
                  layout
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleCompanies.map((company, index) => (
                    <CompanyCard
                      key={company?._id || company?.id || index}
                      company={company}
                      index={index}
                    />
                  ))}
                </motion.div>

                <CompanyPagination
                  page={safePage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
                <Building2
                  size={30}
                  className="mx-auto text-slate-400"
                  aria-hidden="true"
                />
                <h2 className="mt-4 font-semibold">
                  No companies found
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Try another search term or change your filters.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    handleFiltersChange({
                      search: "",
                      industry: null,
                      location: null,
                    })
                  }
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
