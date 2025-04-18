import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { sendRequest } from "@/utils/api";

const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_ID!,
      clientSecret: GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger }) {
      // Only process on GitHub sign-in
      if (trigger === "signIn" && account?.provider === "github") {
        try {
          const res = await sendRequest<IBackendRes<JWT>>({
            url: `${API_URL}/api/v1/auth/social-media`,
            method: "POST",
            body: {
              type: "GITHUB",
              username: user?.email,
            },
          });

          if (res?.data) {
            token.user = res.data.user;
            token.access_token = res.data.access_token;
            token.refresh_token = res.data.refresh_token;
          } else {
            console.error("No data returned from authentication API");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Failed to authenticate with backend service");
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Pass token data to the client-side session
      session.user = token.user;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
