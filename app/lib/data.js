import axios from "axios";
import { createClientAction, createServerAction } from "./create-action";
import { apiRequest } from "./api-request";






const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getJobsAction({ companyId, status = "active" } = {}) {
  try {
    const params = {};
    if (companyId) params.companyId = companyId;
    if (status && status !== "all") params.status = status;

    const response = await axios.get(`${API_BASE_URL}/api/jobs`, {
      params,
    });

    return {
      success: true,
      jobs: response.data?.jobs || response.data || [],
    };
  } catch (error) {
    console.error("Error in getJobsAction:", error.response?.data || error.message);

    return {
      success: false,
      jobs: [],
      error: error.response?.data?.message || "Failed to fetch jobs",
    };
  }
}

export const getCompaniesByRecruiter = createServerAction(
  { requireAuth: true },
  async (payload, user) => {
    console.log("Fetching companies user:", user); 
    const targetUserId = payload?.recruiterId || user?.id || user?._id;
    console.log("Fetching companies for recruiter ID:", targetUserId); 

    return apiRequest('/api/my/companies', null, {
      method: 'GET',
      params: { userId: targetUserId },
      // token,
    });
  }
);




export const getJobs = createServerAction(
  { requireAuth: false },
  async (filters = {}) => {
    console.log("Fetching jobs with filters:", filters);
    return await apiRequest('api/jobs', null, {
      method: 'GET',
      params: filters, 
    });
  }
);

export const getJobById = createServerAction(
  { requireAuth: false },
  async (id) => {
    console.log("Fetching job with ID:", id); 
    return await apiRequest(`api/jobs/${id}`, null, {
      method: 'GET',
    });
  }
);


export const getJobsByCompany = createServerAction(
  { requireAuth: true },
  async (payload, user) => {

    const targetedId = payload ;
    return apiRequest('/api/jobs/', null, {
      method: 'GET',
      params: { companyId: targetedId },
      // token,
    });
  }
);


