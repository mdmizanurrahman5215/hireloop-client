
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

const getSubscriptionByUserInternal = createServerAction(
  { requireAuth: true },
  async (userId) => {
    return await apiRequest(
      `api/subscriptions/user/${userId}`,
      null,
      {
        method: "GET",
      }
    );
  }
);

export async function getSubscriptionByUser(userId) {
  return await getSubscriptionByUserInternal(userId);
}

export async function createSubscription(payload) {
  return await createSubscriptionInternal(payload);
}