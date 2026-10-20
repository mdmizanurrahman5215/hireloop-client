
"use server";

import { apiRequest } from "../api-request";
import { createServerAction } from "../create-action";



const createApplicationInternal = createServerAction(
  { requireAuth: false },
  async (payload) => {
    console.log("Sending application data:", payload);

    return await apiRequest("api/applications", payload, {
      method: "POST",
    });
  }
);

export async function createApplication(payload) {
  return await createApplicationInternal(payload);
}

const getUserApplicationsInternal = createServerAction(
  { requireAuth: false },
  async (userId) => {
    console.log("Fetching applications for user ID:", userId);
    if (!userId || typeof userId !== "string") {
      return {
        success: false,
        error: "User ID is required.",
        status: 400,
      };
    }

    return apiRequest(
      `api/applications/${encodeURIComponent(userId)}`,
      null,
      {
        method: "GET",
      }
    );
  }
);

export const getUserApplications = async (userId) => {
  return getUserApplicationsInternal(userId);
};