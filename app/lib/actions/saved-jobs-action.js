"use server";

import { createServerAction } from "../create-action";
import { apiRequest } from "../api-request";


const saveJobInternal = createServerAction(
  { requireAuth: true },
  async (jobId,user) => {
    try {
      if (!jobId || typeof jobId !== "string") {
        return {
          success: false,
          error: "Job ID is required.",
          status: 400,
        };
      }

      return await apiRequest(
        `/api/savedJobs/${encodeURIComponent(jobId)}`,
        null,
        {
          method: "POST",
          auth: true,
        }
      );
    } catch (error) {
      console.error("Save job action error:", error);

      return {
        success: false,
        error: error?.message || "Failed to save job.",
        status: error?.status || 500,
      };
    }
  }
);
const getSavedJobsInternal = createServerAction(
  { requireAuth: true },
  async () => {
    return apiRequest("api/savedJobs", null, {
      method: "GET",
      auth: true,
      redirectOnError: false,
    });
  },
);
const removeSavedJobInternal = createServerAction(
  { requireAuth: true },
  async (jobId) => {
    if (!jobId || typeof jobId !== "string") {
      return {
        success: false,
        error: "Invalid job ID.",
        status: 400,
      };
    }

    return apiRequest(
      `api/savedJobs/${encodeURIComponent(jobId)}`,
      null,
      {
        method: "DELETE",
        auth: true,
        redirectOnError: false,
      },
    );
  },
);

export const removeSavedJob = async (jobId) =>
  removeSavedJobInternal(jobId);

export const getSavedJobs = async () => {
  return getSavedJobsInternal();
};

export const saveJob = async (jobId) => {
  return await saveJobInternal(jobId);
};