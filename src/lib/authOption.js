import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "@/app/actions/auth/loginUser";
import dbConnect, { collectionNameObj } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);
          console.log("User found:", user);
          return user || null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user" } },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!account) return true; 

      const { providerAccountId, provider } = account; 
      const { email: user_email, image, name } = user;

      try {
        const userCollection = await dbConnect(collectionNameObj.userCollection);

        const existingUser = await userCollection.findOne({ providerAccountId });
        if (!existingUser) {
          const payload = {
            user_email,
            name,
            image,
            provider,
            providerAccountId,
            createdAt: new Date(),
          };
          await userCollection.insertOne(payload);
          console.log("New social user inserted:", payload);
        } else {
          console.log("User already exists:", existingUser);
        }

        return true;
      } catch (error) {
        console.error("MongoDB signIn callback error:", error);
        return false;
      }
    },
  },
};
