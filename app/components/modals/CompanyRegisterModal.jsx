"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { X, Building2, Mail, Globe, Layers } from "lucide-react";

const INDUSTRY_OPTIONS = [
  { value: "Quantum Computing", label: "Quantum Computing" },
  { value: "Venture Capital", label: "Venture Capital" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Aerospace", label: "Aerospace" },
  { value: "Robotics", label: "Robotics" },
  { value: "Software / SaaS", label: "Software / SaaS" },
  { value: "Fintech", label: "Fintech" },
];

const validationSchema = Yup.object({
  name: Yup.string().required("Company name is required"),
  email: Yup.string().email("Invalid email address").required("Recruiter email is required"),
  industry: Yup.object().nullable().required("Please select an industry"),
  website: Yup.string().url("Must be a valid URL (e.g. https://company.com)").optional(),
});

export default function CompanyRegisterModal({ isOpen, onClose, onAddCompany }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      industry: null,
      website: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newCompany = {
        id: `cmp_${Date.now()}`,
        name: values?.name,
        initials: values?.name
          ? values?.name
              ?.split(" ")
              ?.map((word) => word?.[0])
              ?.slice(0, 2)
              ?.join("")
              ?.toUpperCase()
          : "CP",
        email: values?.email,
        industry: values?.industry?.value,
        status: "Pending",
        dateSubmitted: new Date()?.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      if (onAddCompany) {
        onAddCompany(newCompany);
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
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Register New Company
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add corporate entity details for Hireloop ecosystem access.
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
              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Nexus Labs"
                    value={formik?.values?.name}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border ${
                      formik?.touched?.name && formik?.errors?.name
                        ? "border-rose-500"
                        : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                </div>
                {formik?.touched?.name && formik?.errors?.name && (
                  <p className="text-[11px] text-rose-500 font-medium">
                    {formik?.errors?.name}
                  </p>
                )}
              </div>

              {/* Recruiter Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Recruiter Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. sarah.j@nexuslabs.io"
                    value={formik?.values?.email}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border ${
                      formik?.touched?.email && formik?.errors?.email
                        ? "border-rose-500"
                        : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                </div>
                {formik?.touched?.email && formik?.errors?.email && (
                  <p className="text-[11px] text-rose-500 font-medium">
                    {formik?.errors?.email}
                  </p>
                )}
              </div>

              {/* Industry Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Industry <span className="text-rose-500">*</span>
                </label>
                <Select
                  name="industry"
                  options={INDUSTRY_OPTIONS}
                  placeholder="Select Industry Sector..."
                  value={formik?.values?.industry}
                  onChange={(option) => formik?.setFieldValue("industry", option)}
                  onBlur={() => formik?.setFieldTouched("industry", true)}
                  styles={customSelectStyles}
                />
                {formik?.touched?.industry && formik?.errors?.industry && (
                  <p className="text-[11px] text-rose-500 font-medium">
                    {formik?.errors?.industry}
                  </p>
                )}
              </div>

              {/* Website URL (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Website URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    name="website"
                    placeholder="https://nexuslabs.io"
                    value={formik?.values?.website}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    className="w-full rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
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
                  Submit Registration
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}