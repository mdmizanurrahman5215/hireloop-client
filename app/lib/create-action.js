// app/lib/server/create-action.js
import "server-only";

import { revalidatePath } from "next/cache";
import { getServerUser } from "@/app/lib/server-session";
import { getClientUser } from "./client-session";

/**
 * 1. Server-side Action Wrapper (GET ba server-side execution-er jonno)
 */
export function createServerAction(
  { requireAuth = true, revalidate } = {},
  handler
) {
  return async function action(payload) {
    try {
      const user = await getServerUser();

      if (requireAuth && !user?.id) {
        return {
          success: false,
          error: "Unauthorized. Please log in.",
          status: 401,
        };
      }

      const result = await handler(payload, user);

      if (result?.success && revalidate) {
        const paths = Array.isArray(revalidate) ? revalidate : [revalidate];
        paths.forEach((path) => revalidatePath(path));
      }

      return result;
    } catch (error) {
      console.error("Server Action Error:", error);
      return {
        success: false,
        error: error?.message || "Something went wrong",
        status: 500,
      };
    }
  };
}


export function createClientAction(
  { requireAuth = true, revalidate } = {},
  handler
) {
  return async function action(payload, clientContext = {}) {
    try {
    
      let user = clientContext.user || null;

      if (!user && requireAuth) {
    
        user = await getClientUser();
      }

      if (requireAuth && !user?.id) {
        return {
          success: false,
          error: "Unauthorized. Please log in.",
          status: 401,
        };
      }

    
      const result = await handler(payload, { user, ...clientContext });

      if (result?.success && revalidate) {
        const paths = Array.isArray(revalidate) ? revalidate : [revalidate];
        paths.forEach((path) => revalidatePath(path));
      }

      return result;
    } catch (error) {
      console.error("Client Action Error:", error);
      return {
        success: false,
        error: error?.message || "Something went wrong",
        status: 500,
      };
    }
  };
}