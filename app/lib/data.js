// import axios from "axios";
// import { createClientAction, createServerAction } from "./create-action";
// import { apiRequest } from "./api-request";






// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export async function getJobsAction({ companyId, status = "active" } = {}) {
//   try {
//     const params = {};
//     if (companyId) params.companyId = companyId;
//     if (status && status !== "all") params.status = status;

//     const response = await axios.get(`${API_BASE_URL}/api/jobs`, {
//       params,
//     });

//     return {
//       success: true,
//       jobs: response.data?.jobs || response.data || [],
//     };
//   } catch (error) {
//     console.error("Error in getJobsAction:", error.response?.data || error.message);

//     return {
//       success: false,
//       jobs: [],
//       error: error.response?.data?.message || "Failed to fetch jobs",
//     };
//   }
// }

// export const getCompaniesByRecruiter = createServerAction(
//   { requireAuth: true },
//   async (payload, user) => {
//     console.log("Fetching companies user:", user); 
//     const targetUserId = payload?.recruiterId || user?.id || user?._id;
//     console.log("Fetching companies for recruiter ID:", targetUserId); 

//     return apiRequest('/api/my/companies', null, {
//       method: 'GET',
//       params: { userId: targetUserId },
//       // token,
//     });
//   }
// );




// export const getJobs = createServerAction(
//   { requireAuth: false },
//   async (filters = {}) => {
//     console.log("Fetching jobs with filters:", filters);
//     return await apiRequest('api/jobs', null, {
//       method: 'GET',
//       params: filters, 
//     });
//   }
// );

// export const getJobById = createServerAction(
//   { requireAuth: false },
//   async (id) => {
//     console.log("Fetching job with ID:", id); 
//     return await apiRequest(`api/jobs/${id}`, null, {
//       method: 'GET',
//     });
//   }
// );


// export const getJobsByCompany = createServerAction(
//   { requireAuth: true },
//   async (payload, user) => {

//     const targetedId = payload ;
//     return apiRequest('/api/jobs/', null, {
//       method: 'GET',
//       params: { companyId: targetedId },
//       // token,
//     });
//   }
// );


import "server-only";

import { createServerAction } from "./create-action";
import { apiRequest } from "./api-request";

export async function getJobsAction({
  companyId,
  status = "active",
} = {}) {
  const params = {};

  if (companyId) params.companyId = companyId;
  if (status && status !== "all") params.status = status;

  const result = await apiRequest("api/jobs", null, {
    method: "GET",
    params,
  });

  if (!result.success) {
    return {
      success: false,
      jobs: [],
      error: result.error,
      status: result.status,
    };
  }

  return {
    success: true,
    jobs: result.data?.jobs || result.data || [],
    status: result.status,
  };
}

export const getCompaniesByRecruiter = createServerAction(
  { requireAuth: true },
  async (payload, user) => {
    const targetUserId = user?.id;

    if (!targetUserId) {
      return {
        success: false,
        error: "Recruiter session is required.",
        status: 401,
      };
    }

    return apiRequest("api/my/companies", null, {
      method: "GET",
      params: { userId: targetUserId },
    });
  }
);

export const getJobs = createServerAction(
  { requireAuth: false },
  async (filters = {}) => {
    return apiRequest("api/jobs", null, {
      method: "GET",
      params: filters,
    });
  }
);

export const getJobById = createServerAction(
  { requireAuth: false },
  async (id) => {
    if (!id || typeof id !== "string") {
      return {
        success: false,
        error: "Job ID is required.",
        status: 400,
      };
    }

    return apiRequest(
      `api/jobs/${encodeURIComponent(id)}`,
      null,
      { method: "GET" }
    );
  }
);

export const getJobsByCompany = createServerAction(
  { requireAuth: true },
  async (payload, user) => {
    const companyId =
      typeof payload === "string"
        ? payload
        : payload?.companyId;

    if (!companyId) {
      return {
        success: false,
        error: "Company ID is required.",
        status: 400,
      };
    }

    return apiRequest("api/jobs", null, {
      method: "GET",
      params: { companyId },
    });
  }
);


