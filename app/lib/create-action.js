// app/lib/server/create-action.js
import "server-only";

import { revalidatePath } from "next/cache";
import { getServerUser } from "@/app/lib/server-session";

export function createAction(
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
        const paths = Array.isArray(revalidate)
          ? revalidate
          : [revalidate];

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