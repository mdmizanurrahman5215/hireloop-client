import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getOAuthState } from "better-auth/api";

if (!process.env.MONGO_DB_URI) {
  throw new Error(
    "Please define MONGO_DB_URI in your environment variables."
  );
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "Please define BETTER_AUTH_SECRET in your environment variables."
  );
}

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "jobseeker",
        input: true,
      },

      planId: {
        type: "string",
        required: false,
        input: false,
      },

      billingInterval: {
        type: "string",
        required: false,
        input: false,
      },

      subscriptionStatus: {
        type: "string",
        required: false,
        defaultValue: "free",
        input: false,
      },

      stripeCustomerId: {
        type: "string",
        required: false,
        input: false,
      },

      stripeSubscriptionId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          let selectedRole = user.role;

          // Google OAuth signup
          const isOAuthCallback =
            ctx?.path === "/callback/:id" ||
            ctx?.path?.startsWith("/callback/");

          if (isOAuthCallback) {
            const oauthState = await getOAuthState();

            selectedRole = oauthState?.role || "jobseeker";
          } else {
            // Email/password signup
            selectedRole =
              ctx?.body?.role ||
              user.role ||
              "jobseeker";
          }

          // Validate role
          if (
            !["jobseeker", "recruiter"].includes(selectedRole)
          ) {
            selectedRole = "jobseeker";
          }

          // Assign a default plan based on role
          const planId =
            selectedRole === "recruiter"
              ? "recruiter-starter"
              : "jobseeker-starter";

          return {
            data: {
              ...user,
              role: selectedRole,
              planId,
              subscriptionStatus: "free",
            },
          };
        },
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL:
    process.env.BETTER_AUTH_URL || "http://localhost:3000",

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});