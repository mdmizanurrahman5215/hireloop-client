
import "server-only";

import axios from "axios";
import { redirect } from "next/navigation";
import { getServerSession } from "./server-session";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5000",
  timeout: 10000,
});

const STATUS_ROUTES = {
  401: "/signin",
  403: "/unauthorized",
  404: "/not-found",
  500: "/server-error",
};

export async function apiRequest(endpoint, payload = null, options = {}) {
  const {
    method = "POST",
    auth = false,
    headers = {},
    params = {},
    redirectOnError = true,
    ...customConfig
  } = options;

  const normalizedMethod = method.toUpperCase();

  const isFormData =
    typeof FormData !== "undefined" && payload instanceof FormData;

  let result;

  try {
    const requestHeaders = { ...headers };

    if (auth) {
      const session = await getServerSession();
      const token = session?.session?.token;

      if (!token) {
        result = {
          success: false,
          error: "Authentication required.",
          status: 401,
        };
      } else {
        requestHeaders.Authorization = `Bearer ${token}`;
      }
    }

    // Continue only if authentication did not fail.
    if (!result) {
      if (payload != null && !isFormData) {
        requestHeaders["Content-Type"] =
          requestHeaders["Content-Type"] || "application/json";
      }

      const response = await axiosInstance({
        ...customConfig,
        url: endpoint.replace(/^\/+/, ""),
        method: normalizedMethod,
        params,
        headers: requestHeaders,
        ...(payload != null &&
        ["POST", "GET", "PUT", "PATCH", "DELETE"].includes(
          normalizedMethod
        )
          ? { data: payload }
          : {}),
      });
        console.log("API Request response:", {response });
      result = {
        success: true,
        data: response.data,
        status: response.status,
      };
    }
  } catch (error) {
    result = {
      success: false,
      error:
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to connect to server",
      status: error?.response?.status ,
    };
  }
  console.log("API Request Result:", {result });

  // Redirect outside the try/catch.
  if (!result.success) {
    const route = STATUS_ROUTES[result.status];

    if (route) {
      redirect(route);
    }
  }

  return result;
}
