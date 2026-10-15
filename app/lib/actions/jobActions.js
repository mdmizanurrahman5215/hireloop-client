
"use server";

import { createServerAction } from "../create-action";
import { apiRequest } from "../api-request";

const createJobInternal = createServerAction(
  { requireAuth: true, revalidate: "/jobs" },
  async (payload, user) => {
    return apiRequest("api/jobs", payload, {
      method: "POST",
      headers: {
        "x-user-id": user?.id || "",
      },
    });
  }
);

const deleteJobInternal = createServerAction(
  { requireAuth: true, revalidate: "/jobs" },
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
      headers: {
        "x-user-id": user?.id || "",
      },
    });
  }
);

const getEditedJobInternal = createServerAction(
  { requireAuth: false },
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
    });
  }
);

const updateJobInternal = createServerAction(
  { requireAuth: false, revalidate: "/jobs" },
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
    });
  }
);

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
