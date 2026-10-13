"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Globe2,
  MapPin,
  Monitor,
  Send,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import FormSection from "../../common/FormSection";
import TextInput from "../../common/TextInput";
import SelectField from "../../common/SelectField";
import FieldError from "../../common/FieldError";
import TextArea from "../../common/TextArea";
import CompanyCard from "../../common/CompanyCard";
import PreviewBlock from "../../common/PreviewBlock";
import { validationSchema } from "../../../validations/recruiters/job.validations";
import {
  categoryOptions,
  currencyOptions,
  jobTypeOptions,
} from "../../../constants/recruiter/job.constants";
import toast from "react-hot-toast";
import { createJobAction, getEditedJobById, updateJobAction } from "../../../lib/actions/jobActions";

export default function PostJobPage({ company }) {
  const [showPreview, setShowPreview] = useState(false);
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [job, setJob] = useState(null);

  console.log({ company });
  const recruiterCompany = company?.data?.success ? company?.data?.companies[0] : {};
  console.log({ recruiterCompany });

  const activeJobsAvailable =
    recruiterCompany?.activeJobs < recruiterCompany?.jobLimit;

  useEffect(() => {
    if (editId) {
      const fetchJobData = async () => {
        setIsLoading(true);
        try {
          const res = await getEditedJobById(editId);
          const jobData = res?.data?.data;
          console.log("Fetched job data for editing:", jobData);
          if (res.success && jobData) {
            setJob(jobData);
          }
        } catch (error) {
          console.error("Failed to load job data for editing:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchJobData();
    }
  }, [editId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // 1. Check Recruiter Verification
    // if (!recruiterCompany?.verified) {
    //   toast.error("Your company account is not verified yet!");
    //   setSubmitting(false);
    //   return;
    // }

    // 2. Check Job Posting Limit
    // if (!activeJobsAvailable) {
    //   toast.error("You have reached your active job posting limit!");
    //   setSubmitting(false);
    //   return;
    // }

    // 3. Construct Payload
    const payload = {
      title: values.jobTitle?.trim() || "",
      category: values.category || "",
      jobType: values.jobType || "",
      salary: {
        min: Number(values.salaryMin) || 0,
        max: Number(values.salaryMax) || 0,
        currency: values.currency?.label || "USD",
      },
      location: {
        city: values.remote ? "" : values.city?.trim() || "",
        country: values.remote ? "" : values.country?.trim() || "",
        remote: Boolean(values.remote),
      },
      applicationDeadline: values.applicationDeadline || null,
      description: {
        responsibilities: values.responsibilities?.trim() || "",
        requirements: values.requirements?.trim() || "",
        benefits: values.benefits?.trim() || "",
      },
      companyId: recruiterCompany._id,
      companyName: recruiterCompany?.name,
      companyLogo: recruiterCompany?.logo,
      userId: recruiterCompany?.userId,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    // 4. Send request using Toast Promise for loading feedback
    const toastId = toast.loading(editId ? "Updating job..." : "Posting job...");
    console.log("Submitting job with payload:", payload);
    try {
      const response = editId
        ? await updateJobAction(editId, payload)
        : await createJobAction(payload);
      console.log({ response });

      if (response.success) {
        toast.success(editId ? "Job updated successfully!" : "Job posted successfully!", { id: toastId });

        if (resetForm) resetForm();

        // Redirect to jobs list page
        router.push("/dashboard/recruiter");
      } else {
        toast.error(response.error || "Failed to save job.", { id: toastId });
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] transition-colors duration-300 dark:bg-[#070a10]">
      <div className="mx-auto w-full max-w-[1380px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                <BriefcaseBusiness size={15} />
                <span>Recruiter Dashboard</span>
                <ChevronDown size={13} />
                <span>Jobs</span>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl">
                {editId ? "Edit Job" : "Post a Job"}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Create a detailed job listing and connect with qualified candidates.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Users size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Active Jobs
                </p>

                <p className="mt-0.5 text-sm font-black text-slate-950 dark:text-white">
                  {recruiterCompany.activeJobs} / {recruiterCompany.jobLimit}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* {!recruiterCompany.verified && (
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
        <XCircle className="mt-0.5 shrink-0 text-rose-500" size={20} />

        <div>
          <h3 className="font-bold text-rose-700 dark:text-rose-400">
            Company approval required
          </h3>

          <p className="mt-1 text-sm text-rose-600 dark:text-rose-400/80">
            Your company must be approved before you can publish a job.
          </p>
        </div>
      </div>
    )} */}

        {/* {!activeJobsAvailable && (
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
        <BriefcaseBusiness
          className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
          size={20}
        />

        <div>
          <h3 className="font-bold text-amber-700 dark:text-amber-400">
            Active job limit reached
          </h3>

          <p className="mt-1 text-sm text-amber-600 dark:text-amber-400/80">
            Your {recruiterCompany.plan} plan allows up to{" "}
            {recruiterCompany.jobLimit} active jobs. Upgrade your
            plan or close an existing job to publish another one.
          </p>
        </div>
      </div>
    )} */}

        <Formik
          enableReinitialize={true}
          initialValues={{
            jobTitle: job?.title || "",
            category:
              categoryOptions.find(
                (opt) => opt.value === (typeof job?.category === "object" ? job?.category?.value : job?.category)
              ) || job?.category || null,
            jobType:
              jobTypeOptions.find(
                (opt) => opt.value === (typeof job?.jobType === "object" ? job?.jobType?.value : job?.jobType)
              ) || job?.jobType || null,
            salaryMin: job?.salary?.min ?? "",
            salaryMax: job?.salary?.max ?? "",
            currency:
              currencyOptions.find(
                (opt) => opt.label === job?.salary?.currency || opt.value === job?.salary?.currency
              ) || { value: "BDT", label: "BDT — TAKA" },
            remote: job?.location?.remote ?? false,
            city: job?.location?.city || "",
            country: job?.location?.country || "",
            applicationDeadline: job?.applicationDeadline
              ? new Date(job.applicationDeadline).toISOString().split("T")[0]
              : "",
            responsibilities: job?.description?.responsibilities || "",
            requirements: job?.description?.requirements || "",
            benefits: job?.description?.benefits || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            handleChange,
            handleBlur,
          }) => (
            <Form className="space-y-6">
              {/* Job Information */}
              <FormSection
                icon={BriefcaseBusiness}
                title="Job Info"
                description="Add the basic information candidates need to understand the position."
              >
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
                  {/* Main Job Information */}
                  <div className="space-y-5">
                    {/* Job Title */}
                    <div>
                      <TextInput
                        label="Job Title"
                        name="jobTitle"
                        value={values.jobTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Senior React Developer"
                        error={errors.jobTitle}
                        touched={touched.jobTitle}
                        required
                      />
                    </div>

                    {/* Category + Job Type */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SelectField
                        label="Job Category"
                        value={values.category}
                        onChange={(option) => setFieldValue("category", option)}
                        options={categoryOptions}
                        placeholder="Select job category"
                        error={errors.category}
                        touched={touched.category}
                        required
                      />

                      <SelectField
                        label="Job Type"
                        value={values.jobType}
                        onChange={(option) => setFieldValue("jobType", option)}
                        options={jobTypeOptions}
                        placeholder="Select job type"
                        error={errors.jobType}
                        touched={touched.jobType}
                        required
                      />
                    </div>

                    {/* Location */}
                    <AnimatePresence initial={false}>
                      {!values.remote && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                        >
                          <TextInput
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Dhaka"
                            error={errors.city}
                            touched={touched.city}
                            required
                          />

                          <TextInput
                            label="Country"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Bangladesh"
                            error={errors.country}
                            touched={touched.country}
                            required
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {values.remote && (
                      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-indigo-500/10 dark:text-indigo-400">
                            <Monitor size={17} />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                              Fully Remote Position
                            </p>

                            <p className="mt-0.5 text-xs text-indigo-600/80 dark:text-indigo-300/70">
                              Candidates can work remotely from anywhere.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Job Settings Sidebar */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <div className="mb-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                        Job Settings
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Configure compensation, work mode and deadline.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Salary */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Salary Range
                          <span className="ml-1 text-rose-500">*</span>
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                          <TextInput
                            label="Minimum"
                            name="salaryMin"
                            type="number"
                            value={values.salaryMin}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="50000"
                            error={errors.salaryMin}
                            touched={touched.salaryMin}
                            required
                          />

                          <TextInput
                            label="Maximum"
                            name="salaryMax"
                            type="number"
                            value={values.salaryMax}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="100000"
                            error={errors.salaryMax}
                            touched={touched.salaryMax}
                            required
                          />
                        </div>

                        <div className="mt-3">
                          <SelectField
                            label="Currency"
                            value={values.currency}
                            onChange={(option) => setFieldValue("currency", option)}
                            options={currencyOptions}
                            placeholder="Currency"
                            error={errors.currency}
                            touched={touched.currency}
                            required
                          />
                        </div>
                      </div>

                      {/* Remote Toggle */}
                      <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                                values.remote
                                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                                  : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              <Globe2 size={18} />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-950 dark:text-white">
                                Remote Position
                              </p>

                              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                {values.remote ? "Remote work enabled" : "Allow remote work"}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            role="switch"
                            aria-checked={values.remote}
                            aria-label="Toggle remote position"
                            onClick={() => setFieldValue("remote", !values.remote)}
                            className={`relative h-7 w-12 shrink-0 rounded-full p-1 outline-none transition-all duration-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20 ${
                              values.remote
                                ? "bg-indigo-600 shadow-md shadow-indigo-600/20"
                                : "bg-slate-300 dark:bg-slate-700"
                            }`}
                          >
                            <span
                              className={`block h-5 w-5 rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 ${
                                values.remote ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Deadline */}
                      <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                        <label
                          htmlFor="applicationDeadline"
                          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                        >
                          Application Deadline
                          <span className="ml-1 text-rose-500">*</span>
                        </label>

                        <div className="relative">
                          <CalendarDays
                            size={17}
                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="applicationDeadline"
                            name="applicationDeadline"
                            type="date"
                            value={values.applicationDeadline}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`h-11 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:ring-2 dark:bg-slate-900 dark:text-slate-100 ${
                              errors.applicationDeadline && touched.applicationDeadline
                                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-800"
                            }`}
                          />
                        </div>

                        <FieldError
                          error={errors.applicationDeadline}
                          touched={touched.applicationDeadline}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* Job Description */}
              <FormSection
                icon={FileText}
                title="Job Description"
                description="Give candidates enough information to understand the role and expectations."
              >
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                  {/* Responsibilities */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          Responsibilities
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          What will they do?
                        </p>
                      </div>

                      <span className="rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        Required
                      </span>
                    </div>

                    <TextArea
                      label=""
                      name="responsibilities"
                      value={values.responsibilities}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.responsibilities}
                      touched={touched.responsibilities}
                      required
                      rows={10}
                    />
                  </div>

                  {/* Requirements */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          Requirements
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          What should candidates know?
                        </p>
                      </div>

                      <span className="rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        Required
                      </span>
                    </div>

                    <TextArea
                      label=""
                      name="requirements"
                      value={values.requirements}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.requirements}
                      touched={touched.requirements}
                      required
                      rows={10}
                    />
                  </div>

                  {/* Benefits */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          Benefits
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          What do you offer?
                        </p>
                      </div>

                      <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        Optional
                      </span>
                    </div>

                    <TextArea
                      label=""
                      name="benefits"
                      value={values.benefits}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.benefits}
                      touched={touched.benefits}
                      rows={10}
                    />
                  </div>
                </div>
              </FormSection>

              {/* Company */}
              <FormSection
                icon={Building2}
                title="Company"
                description="This job will be published under your registered company."
              >
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    <CompanyCard company={recruiterCompany} />
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <Sparkles size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-950 dark:text-white">
                        {recruiterCompany.plan} plan
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Your company can currently publish {recruiterCompany.jobLimit} active jobs.
                      </p>

                      <div className="mt-4">
                        <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
                          <span className="text-slate-500 dark:text-slate-400">
                            Available slots
                          </span>

                          <span className="text-indigo-600 dark:text-indigo-400">
                            {Math.max(
                              recruiterCompany.jobLimit - recruiterCompany.activeJobs,
                              0
                            )}{" "}
                            remaining
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                (recruiterCompany.activeJobs / recruiterCompany.jobLimit) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* Action Bar */}
              <div className="sticky bottom-4 z-30">
                <div className="rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="hidden sm:block">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Ready to publish?
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Review your job details before publishing.
                      </p>
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setShowPreview((prev) => !prev)}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:flex-none"
                      >
                        <FileText size={17} />
                        {showPreview ? "Hide Preview" : "Preview Job"}
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            {editId ? "Updating..." : "Publishing..."}
                          </>
                        ) : (
                          <>
                            <Send size={17} />
                            {editId ? "Update Job" : "Publish Job"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <AnimatePresence initial={false}>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.5)] dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* Preview Header */}
                    <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-white p-6 dark:border-slate-800 dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900 sm:p-8">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                              {values.category?.label || "Job Category"}
                            </span>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {values.jobType?.label || "Job Type"}
                            </span>

                            {values.remote && (
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                Remote
                              </span>
                            )}
                          </div>

                          <h2 className="max-w-3xl text-2xl font-black tracking-[-0.03em] text-slate-950 dark:text-white sm:text-3xl">
                            {values.jobTitle || "Your Job Title"}
                          </h2>

                          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-flex items-center gap-2">
                              <Building2 size={16} />
                              {recruiterCompany.name}
                            </span>

                            <span className="inline-flex items-center gap-2">
                              <MapPin size={16} />
                              {values.remote ? "Remote" : values.city || "City"}
                              {!values.remote && values.country && `, ${values.country}`}
                            </span>

                            <span className="inline-flex items-center gap-2">
                              <CircleDollarSign size={16} />
                              {values.salaryMin || "0"} - {values.salaryMax || "0"}{" "}
                              {values.currency?.value || "USD"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:w-auto">
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                            Apply before
                          </p>

                          <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">
                            {values.applicationDeadline || "Not selected"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-8">
                      <div className="space-y-8">
                        <PreviewBlock title="Responsibilities" value={values.responsibilities} />

                        <PreviewBlock title="Requirements" value={values.requirements} />

                        <PreviewBlock title="Benefits" value={values.benefits} />
                      </div>

                      <div className="h-fit rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <Building2 size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                              Company
                            </p>

                            <p className="truncate text-sm font-black text-slate-950 dark:text-white">
                              {recruiterCompany.name}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Job Type
                            </span>

                            <span className="text-right text-sm font-bold text-slate-950 dark:text-white">
                              {values.jobType?.label || "Not selected"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Category
                            </span>

                            <span className="text-right text-sm font-bold text-slate-950 dark:text-white">
                              {values.category?.label || "Not selected"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Location
                            </span>

                            <span className="text-right text-sm font-bold text-slate-950 dark:text-white">
                              {values.remote ? "Remote" : values.city || "Not selected"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Deadline
                            </span>

                            <span className="text-right text-sm font-bold text-slate-950 dark:text-white">
                              {values.applicationDeadline || "Not selected"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}