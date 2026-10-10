    
// import { headers } from "next/headers";
// import { authClient } from "../auth-client";
// import { auth } from "../auth";

// /**
//  * Server Components, Server Actions, and API Routes-এর জন্য
//  */
// export async function getServerUser() {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     return session?.user ?? null;
//   } catch (error) {
//     console.error("Error fetching server user:", error);
//     return null;
//   }
// }

// /**
//  * Client Components-এর জন্য 
//  */
// export async function getClientUser() {
//   try {
//     const { data: session } = await authClient.getSession();
//     return session?.user ?? null;
//   } catch (error) {
//     console.error("Error fetching client user:", error);
//     return null;
//   }
// }