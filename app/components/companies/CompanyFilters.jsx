
"use client";

import { Formik, Form } from "formik";
import Select from "react-select";
import { Search, X } from "lucide-react";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Design",
  "Energy",
  "Retail",
  "Other",
];

const locations = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Remote",
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    backgroundColor: "var(--company-select-bg)",
    borderColor: state.isFocused
      ? "#3b82f6"
      : "var(--company-select-border)",
    borderRadius: 8,
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    fontSize: 12,
    "&:hover": { borderColor: "#3b82f6" },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
    backgroundColor: "var(--company-select-bg)",
    border: "1px solid var(--company-select-border)",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 12,
    cursor: "pointer",
    color: "var(--company-select-text)",
    backgroundColor: state.isFocused
      ? "var(--company-select-hover)"
      : "var(--company-select-bg)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--company-select-text)",
  }),
  input: (base) => ({
    ...base,
    color: "var(--company-select-text)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--company-select-placeholder)",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

const toOptions = (values) =>
  values.map((value) => ({ value, label: value }));

export default function CompanyFilters({
  onFiltersChange,
  resultCount = 0,
}) {
  return (
    <Formik
      initialValues={{
        search: "",
        industry: null,
        location: null,
      }}
      onSubmit={(values) => onFiltersChange?.(values)}
    >
      {({ values, setFieldValue, handleChange, resetForm }) => {
        function updateField(name, value) {
          setFieldValue(name, value);
          onFiltersChange?.({
            ...values,
            [name]: value,
          });
        }

        function clearFilters() {
          const emptyValues = {
            search: "",
            industry: null,
            location: null,
          };

          resetForm({ values: emptyValues });
          onFiltersChange?.(emptyValues);
        }

        return (
          <Form
            role="search"
            className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col gap-3 md:flex-row">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">
                  Search companies by name or description
                </span>

                <Search
                  size={16}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="search"
                  type="search"
                  value={values.search}
                  onChange={(event) => {
                    handleChange(event);
                    updateField("search", event.target.value);
                  }}
                  placeholder="Search companies, industries, or locations..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:w-[360px]">
                <Select
                  aria-label="Filter by industry"
                  instanceId="company-industry"
                  placeholder="All industries"
                  options={toOptions(industries)}
                  styles={selectStyles}
                  value={values.industry}
                  onChange={(option) =>
                    updateField("industry", option || null)
                  }
                  isClearable
                  isSearchable
                />

                <Select
                  aria-label="Filter by location"
                  instanceId="company-location"
                  placeholder="All locations"
                  options={toOptions(locations)}
                  styles={selectStyles}
                  value={values.location}
                  onChange={(option) =>
                    updateField("location", option || null)
                  }
                  isClearable
                  isSearchable
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <p
                aria-live="polite"
                className="text-xs text-slate-500 dark:text-slate-400"
              >
                {resultCount} companies found
              </p>

              {(values.search ||
                values.industry ||
                values.location) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 rounded text-xs text-slate-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  <X size={13} />
                  Clear filters
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
