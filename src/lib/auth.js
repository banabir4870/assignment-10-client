import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: 'user',
        input: false
      },
      plan: {
        type: "string",
        defaultValue: 'free',
        input: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  session:{
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60*60*24*7
    }
  },
  plugins: [
    jwt()
  ]
});