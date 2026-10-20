"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { X, Briefcase, Building2, MapPin, DollarSign, Layers, FileText } from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "Design", label: "Design" },
  { value: "Engineering", label: "Engineering" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Operations", label: "Operations" },
];

const JOB_TYPE_OPTIONS = [
  { value: "Full-time", label: "Full-time" },
  { value: "Contract", label: "Contract" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Part-time", label: "Part-time" },
];

const validationSchema = Yup.object({
  title: Yup.string().required("Job title is required"),
  company: Yup.string().required("Company name is required"),
  category: Yup.object().nullable().required("Please select a category"),
  type: Yup.object().nullable().required("Please select a job type"),
  salary: Yup.string().required("Salary / Compensation is required"),
  description: Yup.string().min(30, "Description must be at least 30 characters").required("Description is required"),
});

export default function CreateJobModal({ isOpen, onClose, onAddJob }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      category: null,
      type: null,
      salary: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newJob = {
        id: `job_${Date.now()}`,
        refId: `Ref: HL-${Math.floor(10000 + Math.random() * 90000)}`,
        title: values?.title,
        company: values?.company,
        companyInitials: values?.company
          ? values?.company
              ?.split(" ")
              ?.map((word) => word?.[0])
              ?.slice(0, 2)
              ?.join("")
              ?.toUpperCase()
          : "CP",
        category: values?.category?.value,
        type: values?.type?.value,
        status: "ACTIVE",
        datePosted: new Date()?.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      if (onAddJob) {
        onAddJob(newJob);
      }
      resetForm();
      onClose();
    },
  });

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "var(--tw-bg-slate-50, #f8fafc)",
      borderColor: state?.isFocused ? "#3b82f6" : "#e2e8f0",
      borderRadius: "0.75rem",
      padding: "0.2rem",
      boxShadow: state?.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.2)" : "none",
      "&:hover": { borderColor: "#3b82f6" },
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#0f172a",
        borderColor: state?.isFocused ? "#3b82f6" : "#1e293b",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderRadius: "0.75rem",
      border: "1px solid #e2e8f0",
      zIndex: 60,
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#0f172a",
        border: "1px solid #1e293b",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state?.isSelected
        ? "#3b82f6"
        : state?.isFocused
        ? "#eff6ff"
        : "transparent",
      color: state?.isSelected ? "#ffffff" : "#0f172a",
      cursor: "pointer",
      padding: "0.6rem 1rem",
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: state?.isSelected
          ? "#3b82f6"
          : state?.isFocused
          ? "#1e293b"
          : "transparent",
        color: state?.isSelected ? "#ffffff" : "#f8fafc",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#0f172a",
      "@media (prefers-color-scheme: dark)": { color: "#f8fafc" },
    }),
    placeholder: (base) => ({ ...base, color: "#94a3b8" }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Create New Job Listing
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Publish an active opening across the Hireloop ecosystem.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={formik?.handleSubmit} className="space-y-4 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Job Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Senior Product Designer"
                      value={formik?.values?.title}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border ${
                        formik?.touched?.title && formik?.errors?.title
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    />
                  </div>
                  {formik?.touched?.title && formik?.errors?.title && (
                    <p className="text-[11px] text-rose-500 font-medium">{formik?.errors?.title}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Nexus Lab"
                      value={formik?.values?.company}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border ${
                        formik?.touched?.company && formik?.errors?.company
                          ? "border-rose-500"
                          : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    />
                  </div>
                  {formik?.touched?.company && formik?.errors?.company && (
                    <p className="text-[11px] text-rose-500 font-medium">{formik?.errors?.company}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Select */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    name="category"
                    options={CATEGORY_OPTIONS}
                    placeholder="Select Category..."
                    value={formik?.values?.category}
                    onChange={(option) => formik?.setFieldValue("category", option)}
                    onBlur={() => formik?.setFieldTouched("category", true)}
                    styles={customSelectStyles}
                  />
                  {formik?.touched?.category && formik?.errors?.category && (
                    <p className="text-[11px] text-rose-500 font-medium">{formik?.errors?.category}</p>
                  )}
                </div>

                {/* Job Type Select */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Employment Type <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    name="type"
                    options={JOB_TYPE_OPTIONS}
                    placeholder="Select Type..."
                    value={formik?.values?.type}
                    onChange={(option) => formik?.setFieldValue("type", option)}
                    onBlur={() => formik?.setFieldTouched("type", true)}
                    styles={customSelectStyles}
                  />
                  {formik?.touched?.type && formik?.errors?.type && (
                    <p className="text-[11px] text-rose-500 font-medium">{formik?.errors?.type}</p>
                  )}
                </div>
              </div>

              {/* Salary */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Compensation Range <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="salary"
                    placeholder="e.g. $120,000 - $150,000 / year"
                    value={formik?.values?.salary}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border ${
                      formik?.touched?.salary && formik?.errors?.salary
                        ? "border-rose-500"
                        : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                </div>
                {formik?.touched?.salary && formik?.errors?.salary && (
                  <p className="text-[11px] text-rose-500 font-medium">{formik?.errors?.salary}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Job Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Provide responsibilities, requirements, and benefits..."
                  value={formik?.values?.description}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border ${
                    formik?.touched?.description && formik?.errors?.description
                      ? "border-rose-500"
                      : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
                {formik?.touched?.description && formik?.errors?.description && (
                  <p className="text-[11px] text-rose-500 font-medium">{formik?.errors?.description}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formik?.isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500/50 shadow-md shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}