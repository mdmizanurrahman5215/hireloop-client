
"use server";

import { apiRequest } from "../api-request";
import { createServerAction } from "../create-action";



const createApplicationInternal = createServerAction(
  { requireAuth: true },
  async (payload) => {

    return await apiRequest("api/applications", payload, {
      method: "POST",
      auth:true,
    });
  }
);

export async function createApplication(payload) {
  return await createApplicationInternal(payload);
}

const getUserApplicationsInternal = createServerAction(
  { requireAuth: true, roles:["recruiter", "admin","jobseeker"] },
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
        auth:true,
      }
    );
  }
);

export const getUserApplications = async (userId) => {
  return getUserApplicationsInternal(userId);
};