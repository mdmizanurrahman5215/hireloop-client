// app/lib/server/api-request.js
import "server-only";

import axios from "axios";
// import { getServerAccessToken } from "./access-token";

const axiosInstance = axios.create({
  baseURL:
    process.env.API_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiRequest(
  endpoint,
  payload = null,
  options = {}
) {
  const {
    method = "POST",
    headers = {},
    params = {},
    ...customConfig
  } = options;

  try {
    // const token = await getServerAccessToken();

    const response = await axiosInstance({
      url: endpoint,
      method: method.toUpperCase(),
      params,
      headers: {
        ...headers,
        // ...(token
        //   ? { Authorization: `Bearer ${token}` }
        //   : {}),
      },
      ...(payload != null &&
      ["POST", "PUT", "PATCH", "DELETE"].includes(
        method.toUpperCase()
      )
        ? { data: payload }
        : {}),
      ...customConfig,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to connect to server",
      status: error?.response?.status || 500,
    };
  }
}