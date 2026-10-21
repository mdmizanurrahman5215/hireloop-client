
"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { getServerUser } from "../server-session";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function createCompanyAction(payload) {
  try {
    // 1. Check authenticated user
    const user = await getServerUser();

    if (!user?.id) {
      return {
        success: false,
        error: "Unauthorized. Please log in to register a company.",
      };
    }

    // 2. Prepare backend payload
    const companyPayload = {
      ...payload,
      userId: user.id,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    // 3. Send request to Express API
    const response = await axios.post(
      `${API_BASE_URL}/api/companies`,
      companyPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    // 4. Revalidate relevant page
    revalidatePath("/companies");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("createCompanyAction failed:", {
      message: error.message,
      status: error.response?.status,
      backendResponse: error.response?.data,
    });

    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to register company. Please try again.",
    };
  }
}
