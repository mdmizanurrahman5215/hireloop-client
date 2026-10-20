"use client";
import React, { useState } from "react";
import JobHeaderBanner from "../common/jobs/jobDetails/JobHeaderBanner";
import JobQuickMetrics from "../common/jobs/jobDetails/JobQuickMetrics";
import JobRequirementsList from "../common/jobs/jobDetails/JobRequirementsList";
import JobBenefitsGrid from "../common/jobs/jobDetails/JobBenefitsGrid";
import CompanyOverviewCard from "../cards/CompanyOverviewCard";
import JobApplicationModal from "../modals/JobApplicationModal";
import PlanLimitModal from "../modals/PlanLimitModal";
import { useRouter } from "next/navigation";
import { createApplication, getUserApplications } from "../../lib/actions/applicationAction";
import toast from "react-hot-toast";
import { getPlanById } from "../../lib/actions/jobActions";

export default function JobDetailsPage({ job, id, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");
  const [isCheckingLimit, setIsCheckingLimit] = useState(false);

  const router = useRouter();

 const handleApply = async () => {
  let loadingToastId;

  try {
    if (!user) {
      toast.error("Please sign in to apply for this job.");
      router.push(`/signin?redirect=/jobs/${id}`);
      return;
    }

    if (user?.role && user.role !== "jobseeker") {
      toast.error("Only jobseekers can apply for this job.");
      return;
    }

    const userId = user?._id || user?.id;

    if (!userId) {
      toast.error("Unable to verify your account. Please sign in again.");
      return;
    }

    const planId = user?.planId || user?.subscriptionPlanId;

    if (!planId || typeof planId !== "string") {
      toast.error("Your subscription plan could not be identified.");
      return;
    }

    setIsCheckingLimit(true);
    loadingToastId = toast.loading("Checking your application limit...");

    const [planResult, userApplications] = await Promise.all([
      getPlanById(planId),
      getUserApplications(userId),
    ]);
    console.log("Plan Result:", planResult);
    console.log("User Applications:", userApplications);

    if (!planResult?.success) {
      toast.error(
        planResult?.message ||
          planResult?.error ||
          "Failed to verify your subscription plan."
      );
      return;
    }

    const plan = planResult?.data?.data?.plan || planResult?.plan;

    if (!plan) {
      toast.error("Subscription plan details were not found.");
      return;
    }

    if (plan.isActive !== true) {
      toast.error("Your subscription plan is currently inactive.");
      return;
    }

    if (plan.userType !== "jobseeker") {
      toast.error("This plan is not valid for job applications.");
      return;
    }

    const monthlyLimit = plan?.limits?.monthlyApplications;
    const hasUnlimitedApplications =
      plan.isUnlimitedApplications === true || monthlyLimit === null;

    if (hasUnlimitedApplications) {
      setIsModalOpen(true);
      return;
    }

    if (typeof monthlyLimit === "number" && monthlyLimit >= 0) {
      const applicationsList = Array.isArray(userApplications)
        ? userApplications
        : userApplications?.data?.applications || userApplications?.applications || [];

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const currentMonthApplicationsCount = applicationsList.filter((app) => {
        const appDate = new Date(app.createdAt || app.date || app.appliedAt);
        return (
          !isNaN(appDate.getTime()) &&
          appDate.getMonth() === currentMonth &&
          appDate.getFullYear() === currentYear
        );
      }).length;

      if (currentMonthApplicationsCount >= monthlyLimit) {
        setLimitMessage(
          `You have used all ${monthlyLimit} application(s) allowed for this month on your current plan.`
        );
        setIsLimitModalOpen(true);
        return;
      }

      setIsModalOpen(true);
      return;
    }

    toast.error("Your application limit could not be verified. Please try again.");
  } catch (error) {
    console.error("Application limit check error:", error);
    toast.error(error?.message || "Something went wrong while checking your application limit.");
  } finally {
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }
    setIsCheckingLimit(false);
  }
};

  const handleApplySubmit = async (values, { resetForm } = {}) => {
    const resume = values?.resume;

    if (
      typeof File === "undefined" ||
      !(resume instanceof File) ||
      resume.size === 0
    ) {
      toast.error("Please select your resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user?._id || user?.id || "");
    formData.append("companyId", job?.company?._id || job?.companyId || "");
    formData.append("jobId", job?._id || job?.id || id || "");
    formData.append("fullName", values?.fullName || "");
    formData.append("email", values?.email || "");
    formData.append("phone", values?.phone || "");
    formData.append("portfolio", values?.portfolio || "");
    formData.append("coverLetter", values?.coverLetter || "");
    formData.append(
      "experience",
      values?.experience?.label || values?.experience || ""
    );
    formData.append("resume", values?.resume);

    const loadingToastId = toast.loading("Submitting your application...");

    try {
      const result = await createApplication(formData);

      if (!result?.success || result?.error) {
        toast.error(
          result?.error || result?.message || "Failed to post application",
          { id: loadingToastId }
        );
        return;
      }

      toast.success("Your job application was submitted successfully!", {
        id: loadingToastId,
      });

      resetForm?.();
    } catch (error) {
      toast.error(
        `Submission error: ${error?.message || "Something went wrong"}`,
        { id: loadingToastId }
      );
    }
  };

  const formatLocation = (loc) => {
    if (!loc) return "Not specified";
    if (typeof loc === "string") return loc;
    if (typeof loc === "object") {
      const parts = [loc?.city, loc?.country].filter(Boolean);
      const locationText = parts.join(", ");
      if (loc?.remote) {
        return locationText ? `${locationText} (Remote)` : "Remote";
      }
      return locationText || "Not specified";
    }
    return "Not specified";
  };

  const formatSalary = (salary) => {
    if (!salary) return "Negotiable";
    if (typeof salary === "string" || typeof salary === "number") {
      return salary;
    }
    if (typeof salary === "object") {
      const { min, max, currency = "BDT" } = salary;
      const currencySymbol = typeof currency === "object" ? currency?.label || currency?.value || "BDT" : currency;

      if (min && max) {
        return `${currencySymbol} ${min.toLocaleString()} - ${currencySymbol} ${max.toLocaleString()}`;
      }
      if (min) {
        return `From ${currencySymbol} ${min.toLocaleString()}`;
      }
      if (max) {
        return `Up to ${currencySymbol} ${max.toLocaleString()}`;
      }
    }
    return "Negotiable";
  };

  const normalizeToList = (plan) => {
    if (!plan) return [];
    if (Array.isArray(plan)) return plan;
    if (typeof plan === "string") {
      return plan.split("\n").filter((item) => item.trim().length > 0);
    }
    if (typeof plan === "object") {
      return Object.values(plan).filter(
        (val) => typeof val === "string" || typeof val === "number"
      );
    }
    return [];
  };

  const responsibilitiesList = normalizeToList(job?.description?.responsibilities) || normalizeToList(job?.responsibilities);
  const requirementsList = normalizeToList(job?.description?.requirements) || normalizeToList(job?.requirements);

  const formattedMetrics = {
    location: formatLocation(job?.location || job?.metrics?.location),
    jobType: job?.jobType?.label || job?.jobType || job?.metrics?.jobType || "Full-time",
    experience: job?.experience || job?.metrics?.experience || "Not specified",
    salary: formatSalary(job?.salary || job?.metrics?.salary),
  };

  const safeJobHeader = {
    ...job,
    location: formatLocation(job?.location),
    salary: formatSalary(job?.salary),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        <JobHeaderBanner
          job={safeJobHeader}
          onApplyClick={() => handleApply()}
          disabled={isCheckingLimit}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <JobQuickMetrics metrics={formattedMetrics} />

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm dark:shadow-xl">
              {job?.description && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Job Description
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {typeof job?.description === "string"
                      ? job?.description
                      : JSON.stringify(job?.description)}
                  </p>
                </div>
              )}

              {responsibilitiesList.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Responsibilities
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {responsibilitiesList.map((item, index) => (
                      <li
                        key={index}
                        className="marker:text-slate-400 dark:marker:text-slate-500"
                      >
                        {typeof item === "object" ? JSON.stringify(item) : item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <JobRequirementsList
                skills={job?.skills || job?.tags}
                bulletPoints={requirementsList}
              />

              <JobBenefitsGrid benefits={job?.benefits} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <CompanyOverviewCard company={job?.company || job} />
          </div>
        </div>
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobplan={{
          title: job?.title,
          company: job?.companyName || job?.company?.name,
        }}
        onSubmit={handleApplySubmit}
      />

      <PlanLimitModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        message={limitMessage}
      />
    </div>
  );
}