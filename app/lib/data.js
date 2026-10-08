import axios from "axios";
import { apiRequest, createAction } from "./core/apiClient";


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


export const getCompaniesByRecruiterAction = createAction(
  { requireAuth: true }, 
  async (payload, user) => {
   
    const targetUserId = payload?.recruiterId || user.id;

   
    return await apiRequest('/api/companies', null, {
      method: 'GET',
      params: { userId: targetUserId },
    });
  }
);

export const getJobs = createAction(
  { requireAuth: false },
  async (filters = {}) => {
    console.log("Fetching jobs with filters:", filters); // Debugging log
    // filters hobe: { page: 1, search: 'Frontend', type: 'Full-time' }
    return await apiRequest('api/jobs', null, {
      method: 'GET',
      params: filters, // query string hisebe URL-e jabe
    });
  }
);