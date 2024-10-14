// /types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  type User = {
    role?: string;
  };

  type Session = {
    user: {
      id?: string;
      fullName?: string;
      email?: string;
      role?: string;
    };
  };

  type JWT = {
    role?: string;
  };
}
