
// import "server-only";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { getServerUser } from "./server-session";

// export function createServerAction(
//   { requireAuth = true, roles = [], revalidate } = {},
//   handler,
// ) {
//   return async function action(payload) {
//     try {
//       const user = await getServerUser();

//       // Authentication check
//       if (requireAuth && !user?.id) {
//         return {
//           success: false,
//           error: "Unauthorized. Please log in.",
//           status: 401,
//         };
//       }

//       // Role authorization check
//       if (roles.length > 0) {
//         if (!user?.id) {
//           return {
//             success: false,
//             error: "Authentication required.",
//             status: 401,
//           };
//         }

//         const userRole = user.role?.trim().toLowerCase();
//         const allowedRoles = roles.map((role) =>
//           role.trim().toLowerCase()
//         );

//         if (!allowedRoles.includes(userRole)) {
//           return {
//             success: false,
//             error: "Forbidden access. You do not have permission.",
//             status: 403,
//           };
//         }
//       }

//       // Execute action handler
//       const result = await handler(payload, user);

//       // Revalidate cache after successful operation
//       if (result?.success && revalidate) {
//         const paths = Array.isArray(revalidate)
//           ? revalidate
//           : [revalidate];

//         for (const path of paths) {
//           revalidatePath(path);
//         }
//       }

//       return result;
//     } catch (error) {
//       // Next.js redirect() throws a special control-flow error.
//       // Rethrow it so Next.js can complete the redirect.
//       if (error?.digest?.startsWith("NEXT_REDIRECT")) {
//         redirectFromError(error);
//       }

//       console.error("Server Action Error:", error);

//       return {
//         success: false,
//         error: error?.message || "Something went wrong.",
//         status: 500,
//       };
//     }
//   };
// }

// // Preserve Next.js redirect control flow.
// function redirectFromError(error) {
//   throw error;
// }


import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerUser } from "./server-session";

const STATUS_ROUTES = {
  401: "/signin",
  403: "/unauthorized",
  404: "/not-found",
  500: "/server-error",
};

export function createServerAction(
  { requireAuth = true, roles = [], revalidate } = {},
  handler,
) {
  return async function action(payload) {
    try {
      const user = await getServerUser();

      // Authentication check
      if (requireAuth && !user?.id) {
        return {
          success: false,
          error: "Unauthorized. Please log in.",
          status: 401,
        };
      }

      // Role authorization check
      if (roles.length > 0) {
        if (!user?.id) {
          return {
            success: false,
            error: "Authentication required.",
            status: 401,
          };
        }

        const userRole = user.role?.trim().toLowerCase();

        const allowedRoles = roles.map((role) =>
          role.trim().toLowerCase()
        );

        if (!allowedRoles.includes(userRole)) {
          return {
            success: false,
            error: "Forbidden access. You do not have permission.",
            status: 403,
          };
        }
      }

      // Execute action handler
      const result = await handler(payload, user);

      // Revalidate cache after successful operation
      if (result?.success && revalidate) {
        const paths = Array.isArray(revalidate)
          ? revalidate
          : [revalidate];

        for (const path of paths) {
          revalidatePath(path);
        }
      }

      // Redirect based on error status
      if (!result?.success) {
        const route = STATUS_ROUTES[result?.status];

        if (route) {
          redirect(route);
        }
      }

      return result;
    } catch (error) {
      // Preserve Next.js redirect control flow
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }

      console.error("Server Action Error:", error);

      return {
        success: false,
        error: error?.message || "Something went wrong.",
        status: error?.status || 500,
      };
    }
  };
}
