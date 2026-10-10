"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

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