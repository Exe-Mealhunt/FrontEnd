import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { config } from "../config";

import { User } from "../constants/types/user.type";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        const resp = await fetch(`${config.BACKEND_API}/api/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await resp.json();
        if (resp.ok && user?.email) {
          return user as User;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as User & { emailVerified: null };
      session.user = user;
      return session;
    },
  },
});
