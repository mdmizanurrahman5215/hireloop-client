"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { createClientAction, createServerAction } from "../create-action";
import { apiRequest } from "../api-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createJobAction(payload) {
  try {
  
    const response = await axios.post(`${API_BASE_URL}/api/jobs`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  
    revalidatePath("/jobs");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error in createJobAction:", error.response?.data || error.message);

    return {
      success: false,
      error: error.response?.data?.message || "Failed to post job",
    };
  }
}


export const deleteJob = createServerAction(
  { requireAuth: true, revalidate: "/jobs" },
  async (payload, user) => {
    // Payload theke job ID nichi (ekhane payload object ba direct string hote pare)
    const jobId = payload?.jobId || payload;
    
    if (!jobId || typeof jobId !== "string") {
      return {
        success: false,
        error: "Job ID is required for deletion.",
        status: 400,
      };
    }

    console.log("Deleting job ID:", jobId);
    console.log("Requested by server-session user:", user?.id || user?._id);

    // API request call (DELETE method) - Server session theke user ID header e pathano hocche
    return await apiRequest(`api/jobs/${jobId}`, null, {
      method: 'DELETE',
      headers: {
        "x-user-id": user?.id || user?._id || "",
      },
    });
  }
);

export const getEditedJobById = createClientAction(
  { requireAuth: false },
  async (id) => {
    console.log("Fetching job with ID:", id); 
    return await apiRequest(`api/jobs/${id}`, null, {
      method: 'GET',
    });
  }
);
export const updateJobAction = createClientAction(
  { requireAuth: false }, 
  async (editId, payload) => {
    console.log("Updating job with ID:", editId);
    return await apiRequest(`api/jobs/${editId}`, payload, {
      method: 'PUT', 
    });
  }
);