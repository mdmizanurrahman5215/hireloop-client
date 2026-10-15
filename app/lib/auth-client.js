
// import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
//     /** The base URL of the server (optional if you're using the same domain) */
//     baseURL: process.env.BETTER_AUTH_URL
// })
// export const { signIn, signUp, useSession } = createAuthClient()


import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
  ...(process.env.BETTER_AUTH_URL
    ? { baseURL: process.env.BETTER_AUTH_URL }
    : {}),
});

export const { signIn, signUp, useSession } = authClient;
