import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "supporter", input: true },
      credits: { type: "number", defaultValue: 0, input: false },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = user.role === "creator" ? "creator" : "supporter";
          const credits = role === "creator" ? 20 : 50;
          return { data: { ...user, role, credits } };
        },
      },
    },
  },

  plugins: [jwt()],
});