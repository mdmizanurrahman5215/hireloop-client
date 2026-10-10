"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { getServerUser } from "../server-session";






const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createCompanyAction(payload) {
  try {
    // 1. Get authenticated user details
    const user = await getServerUser();

    if (!user || !user.id) {
      return {
        success: false,
        error: "Unauthorized. Please log in to register a company.",
      };
    }

    // 2. Attach user information and creation timestamp to backend payload
    const companyPayload = {
      ...payload,
      userId: user.id,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    // 3. Send request to backend Express API
    const response = await axios.post(
      `${API_BASE_URL}/api/companies`,
      companyPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // 4. Revalidate frontend paths
    revalidatePath("/companies");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error in createCompanyAction:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error: error.response?.data?.message || "Failed to register company test",
    };
  }
}


