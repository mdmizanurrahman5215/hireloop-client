import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { getServerUser } from './session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Pre-configured Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

export async function apiRequest(endpoint, payload = null, options = {}) {
  const { method = 'POST', headers = {}, params = {}, ...customConfig } = options;

  const config = {
    url: endpoint,
    method: method?.toUpperCase?.() || 'POST',
    headers: {
      ...headers,
    },
    params,
    ...customConfig,
  };

  // Attach payload for data-modifying methods
  if (payload && ['POST', 'PUT', 'PATCH', 'DELETE']?.includes(config?.method)) {
    config.data = payload;
  }

  try {
    const response = await axiosInstance(config);

    return {
      success: true,
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error(
      `Axios API Request Error [${endpoint}]:`,
      error?.response?.data || error?.message
    );

    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to connect to server',
      status: error?.response?.status || 500,
    };
  }
}

export function createAction({ requireAuth = true, revalidate } = {}, handler) {
  return async (payload) => {
    try {
      let user = null;

      if (requireAuth) {
       
        user = await getServerUser();
        if (!user?.id) {
          return {
            success: false,
            error: 'Unauthorized. Please log in to proceed.',
          };
        }
      } else {
   
        try {
          user = await getServerUser();
        } catch (authErr) {
          user = null;
        }
      }

      const result = await handler(payload, user);

   
      if (result?.success && revalidate) {
        revalidatePath(revalidate);
      }

      return result?.data?.companies?.[0] ? result?.data?.companies?.[0] : result;
    } catch (error) {
      console.error('Server Action Error:', error);
      return {
        success: false,
        error: error?.message || 'Something went wrong',
      };
    }
  };
}