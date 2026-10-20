
"use server";

import { apiRequest } from "../api-request";
import { createServerAction } from "../create-action";

const createSubscriptionInternal = createServerAction(
  { requireAuth: false },
  async (payload) => {
    console.log("Sending subscription data:", payload);

    return await apiRequest("api/subscriptions", payload, {
      method: "POST",
    });
  }
);

export async function createSubscription(payload) {
  return await createSubscriptionInternal(payload);
}