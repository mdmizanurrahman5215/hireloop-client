// // app/lib/server/api-request.js
// import "server-only";

// import axios from "axios";
// // import { getServerAccessToken } from "./access-token";

// const axiosInstance = axios.create({
//   baseURL:
//     process.env.API_URL || "http://localhost:5000",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export async function apiRequest(
//   endpoint,
//   payload = null,
//   options = {}
// ) {
//   const {
//     method = "POST",
//     headers = {},
//     params = {},
//     ...customConfig
//   } = options;

//   try {
//     // const token = await getServerAccessToken();

//     const response = await axiosInstance({
//       url: endpoint,
//       method: method.toUpperCase(),
//       params,
//       headers: {
//         ...headers,
//         // ...(token
//         //   ? { Authorization: `Bearer ${token}` }
//         //   : {}),
//       },
//       ...(payload != null &&
//       ["POST", "PUT", "PATCH", "DELETE"].includes(
//         method.toUpperCase()
//       )
//         ? { data: payload }
//         : {}),
//       ...customConfig,
//     });

//     return {
//       success: true,
//       data: response.data,
//       status: response.status,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error:
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         "Failed to connect to server",
//       status: error?.response?.status || 500,
//     };
//   }
// }


// import "server-only";

// import axios from "axios";

// const API_BASE_URL =
//   process.env.API_URL ||
//   process.env.NEXT_PUBLIC_API_URL ||
//   "http://localhost:5000";

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
// });

// export async function apiRequest(
//   endpoint,
//   payload = null,
//   options = {}
// ) {
//   const {
//     method = "POST",
//     headers = {},
//     params = {},
//     ...customConfig
//   } = options;

//   const normalizedMethod = method.toUpperCase();
//   const isFormData =
//     typeof FormData !== "undefined" &&
//     payload instanceof FormData;

//   const requestHeaders = { ...headers };

//   if (payload != null && !isFormData) {
//     requestHeaders["Content-Type"] =
//       requestHeaders["Content-Type"] || "application/json";
//   }

//   try {
//     // Future JWT integration point:
//     // Retrieve a server-side token here and add Authorization.
//     // Do not trust a token supplied by a Client Component.

//     const response = await axiosInstance({
//       ...customConfig,
//       url: endpoint.replace(/^\/+/, ""),
//       method: normalizedMethod,
//       params,
//       headers: requestHeaders,
//       ...(payload != null &&
//       ["POST", "PUT", "PATCH", "DELETE"].includes(normalizedMethod)
//         ? { data: payload }
//         : {}),
//     });

//     return {
//       success: true,
//       data: response.data,
//       status: response.status,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error:
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         "Failed to connect to server",
//       status: error?.response?.status || 500,
//     };
//   }
// }

import "server-only";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5000",
  timeout: 10000,
});

export async function apiRequest(endpoint, payload = null, options = {}) {
  const {
    method = "POST",
    headers = {},
    params = {},
    ...customConfig
  } = options;

  const isFormData =
    typeof FormData !== "undefined" && payload instanceof FormData;

  try {
    const response = await axiosInstance({
      url: endpoint,
      method: method.toUpperCase(),
      params,
      headers: {
        ...headers,
        ...(payload != null && !isFormData
          ? { "Content-Type": "application/json" }
          : {}),
      },
      ...(payload != null &&
      ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())
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
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to connect to server",
      status: error?.response?.status || 500,
    };
  }
}