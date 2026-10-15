
"use server";

import { apiRequest } from "../api-request";
import { createServerAction } from "../create-action";



const createApplicationInternal = createServerAction(
  { requireAuth: false },
  async (payload) => {
    console.log("Sending application data:", payload);

    return await apiRequest("api/applications", payload, {
      method: "POST",
    });
  }
);

export async function createApplication(payload) {
  return await createApplicationInternal(payload);
}