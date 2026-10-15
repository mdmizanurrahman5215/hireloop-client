"use client";
import React, { useState } from "react";
import JobHeaderBanner from "../common/jobs/jobDetails/JobHeaderBanner";
import JobQuickMetrics from "../common/jobs/jobDetails/JobQuickMetrics";
import JobRequirementsList from "../common/jobs/jobDetails/JobRequirementsList";
import JobBenefitsGrid from "../common/jobs/jobDetails/JobBenefitsGrid";
import CompanyOverviewCard from "../cards/CompanyOverviewCard";
import JobApplicationModal from "../modals/JobApplicationModal";
import { getClientUser } from "../../lib/client-session";
import { useRouter } from "next/navigation";
import { createApplication } from "../../lib/actions/applicationAction";
import toast from "react-hot-toast";


export default function JobDetailsPage({ job , id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
 
  console.log("JobDetailsPage received job:", job);

  const handleApply = async () => {
     const user = await getClientUser();
    console.log("User attempting to apply:", user);
    if (!user) {
      router.push(`/signin?redirect=/jobs/${id}`);
    } else {
      setIsModalOpen(true);
    }
  };


//  const handleApplySubmit = async (values, { resetForm } = {}) => {
//   const payload = {
//     userId: job?.userId || '',
//     companyId: job?.company?._id || job?.companyId || '',
//     jobId: job?._id || job?.id || id || '',
//     fullName: values.fullName || '',
//     email: values.email || '',
//     phone: values.phone || '',
//     portfolio: values.portfolio || '',
//     coverLetter: values.coverLetter || '',
//     experience: values.experience?.label || values.experience || '',
//     resume: values.resume || '',
//   };
//    console.log('resume:',values.resume);
//   const loadingToastId = toast.loading('Submitting your application...');
//   console.log('Submitting application payload:', payload);

//   try {
//     const result = await createApplication(payload);

//     if (result && (result.success === false || result.error)) {
//       const errorMessage = result.error || result.message || 'Failed to post application';
//       toast.error(errorMessage, { id: loadingToastId });
//       console.error('Application submission failed:', result);
//       return;
//     }

//     toast.success('Your job application was submitted successfully!', {
//       id: loadingToastId,
//     });
//     console.log('Application Submitted Successfully:', result);

//     if (resetForm) {
//       resetForm();
//     }
//   } catch (error) {
//     toast.error(`Submission error: ${error.message || 'Something went wrong'}`, {
//       id: loadingToastId,
//     });
//     console.error('Submission error:', error);
//   }
// };
  
const handleApplySubmit = async (values, { resetForm } = {}) => {
  const resume = values.resume;

  // Backend requires an actual uploaded file.
  if (
    typeof File === "undefined" ||
    !(resume instanceof File) ||
    resume.size === 0
  ) {
    toast.error("Please select your resume file.");
    return;
  }

 const formData = new FormData();

formData.append("userId", job?.userId || "");
formData.append("companyId", job?.company?._id || job?.companyId || "");
formData.append("jobId", job?._id || job?.id || id || "");
formData.append("fullName", values.fullName || "");
formData.append("email", values.email || "");
formData.append("phone", values.phone || "");
formData.append("portfolio", values.portfolio || "");
formData.append("coverLetter", values.coverLetter || "");
formData.append(
  "experience",
  values.experience?.label || values.experience || ""
);

formData.append("resume", values.resume);

console.log(
  "FormData entries:",
  [...formData.entries()].map(([key, value]) => [
    key,
    value instanceof File ? value.name : value,
  ])
);

  const loadingToastId = toast.loading(
    "Submitting your application..."
  );

  try {
    const result = await createApplication(formData);

    if (!result?.success || result?.error) {
      toast.error(
        result?.error || result?.message || "Failed to post application",
        { id: loadingToastId }
      );

      console.error("Application submission failed:", result);
      return;
    }

    toast.success("Your job application was submitted successfully!", {
      id: loadingToastId,
    });

    console.log("Application submitted:", result);

    resetForm?.();
  } catch (error) {
    toast.error(
      `Submission error: ${error.message || "Something went wrong"}`,
      { id: loadingToastId }
    );

    console.error("Submission error:", error);
  }
};

// 1. Safe helper to format Location (handles strings or { city, country, remote })
  const formatLocation = (loc) => {
    if (!loc) return "Not specified";
    if (typeof loc === "string") return loc;
    if (typeof loc === "object") {
      const parts = [loc.city, loc.country].filter(Boolean);
      const locationText = parts.join(", ");
      if (loc.remote) {
        return locationText ? `${locationText} (Remote)` : "Remote";
      }
      return locationText || "Not specified";
    }
    return "Not specified";
  };

  // 2. Safe helper to format Salary (handles numbers, strings, or { min, max, currency })
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

  // 3. Safe helper to convert lists/objects into clean renderable arrays
  const normalizeToList = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      return data.split("\n").filter((item) => item.trim().length > 0);
    }
    if (typeof data === "object") {
      return Object.values(data).filter(
        (val) => typeof val === "string" || typeof val === "number"
      );
    }
    return [];
  };

  const responsibilitiesList = normalizeToList(job?.description?.responsibilities) || normalizeToList(job?.responsibilities);
  const requirementsList =
    normalizeToList(job?.description?.requirements) || normalizeToList(job?.requirements);

  // 4. Normalized metrics object guarantees only primitive values (strings/numbers)
  const formattedMetrics = {
    location: formatLocation(job?.location || job?.metrics?.location),
    jobType: job?.jobType?.label || job?.jobType || job?.metrics?.jobType || "Full-time",
    experience: job?.experience || job?.metrics?.experience || "Not specified",
    salary: formatSalary(job?.salary || job?.metrics?.salary),
  };
 console.log("Formatted Metrics:", formattedMetrics);
  // Safe string location pass for JobHeaderBanner
  const safeJobHeader = {
    ...job,
    location: formatLocation(job?.location),
    salary: formatSalary(job?.salary),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <JobHeaderBanner
          job={safeJobHeader}
          onApplyClick={() => handleApply()}
        />

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Metrics Bar (Safe) */}
            <JobQuickMetrics metrics={formattedMetrics} />

            {/* Main Content Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm dark:shadow-xl">
              {/* Job Description */}
              {job?.description && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Job Description
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {typeof job.description === "string"
                      ? job.description
                      : JSON.stringify(job.description)}
                  </p>
                </div>
              )}

              {/* Responsibilities */}
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

              {/* Requirements & Skills */}
              <JobRequirementsList
                skills={job?.skills || job?.tags}
                bulletPoints={requirementsList}
              />

              {/* Benefits */}
              <JobBenefitsGrid benefits={job?.benefits} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <CompanyOverviewCard company={job?.company || job} />
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobData={{
          title: job?.title,
          company: job?.companyName || job?.company?.name,
        }}
        onSubmit={handleApplySubmit}
      />
    </div>
  );
}