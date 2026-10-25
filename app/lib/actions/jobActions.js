
"use server";

import { createServerAction } from "../create-action";
import { apiRequest } from "../api-request";

const createJobInternal = createServerAction(
  { requireAuth: true,roles:["admin","recruiter"], revalidate: "/jobs" },
  async (payload, user) => {
    return apiRequest("api/jobs", payload, {
      method: "POST",
      auth:true,
      headers: {
        "x-user-id": user?.id || "",
      },
    });
  }
);

const deleteJobInternal = createServerAction(
  { requireAuth: true, roles:["admin","recruiter"], revalidate: "/jobs" },
  async (payload, user) => {
    const jobId = payload?.jobId || payload;

    if (!jobId || typeof jobId !== "string") {
      return {
        success: false,
        error: "Job ID is required for deletion.",
        status: 400,
      };
    }

    return apiRequest(`api/jobs/${encodeURIComponent(jobId)}`, null, {
      method: "DELETE",
      auth:true,
      headers: {
        "x-user-id": user?.id || "",
      },
    });
  }
);

const getEditedJobInternal = createServerAction(
  { requireAuth: false, roles:["recruiter"] },
  async (id) => {
    if (!id || typeof id !== "string") {
      return {
        success: false,
        error: "Job ID is required.",
        status: 400,
      };
    }

    return apiRequest(`api/jobs/${encodeURIComponent(id)}`, null, {
      method: "GET",
      auth:true,
    });
  }
);

const updateJobInternal = createServerAction(
  { requireAuth: false, roles:["recruiter"], revalidate: "/jobs" },
  async ({ editId, payload }) => {
    if (!editId || typeof editId !== "string") {
      return {
        success: false,
        error: "Job ID is required.",
        status: 400,
      };
    }

    return apiRequest(`api/jobs/${encodeURIComponent(editId)}`, payload, {
      method: "PUT",
      auth:true,
    });
  }
);

const getPlanByIdInternal = createServerAction(
  { requireAuth: true },
  async (planId) => {
    if (!planId || typeof planId !== "string") {
      return {
        success: false,
        error: "Plan ID is required.",
        status: 400,
      };
    }

    return apiRequest(
      `api/plans/${encodeURIComponent(planId)}`,
      null,
      {
        method: "GET",
        auth:true,
      }
    );
  }
);

export const getPlanById = async (planId) => {
  return getPlanByIdInternal(planId);
};


// These are the public Server Action exports.
export async function createJobAction(payload) {
  return createJobInternal(payload);
}

export async function deleteJob(payload) {
  return deleteJobInternal(payload);
}

export async function getEditedJobById(id) {
  return getEditedJobInternal(id);
}

export async function updateJobAction(editId, payload) {
  return updateJobInternal({ editId, payload });
}
