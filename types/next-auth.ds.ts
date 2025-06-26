// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      roles: string[];
    };
  }

  interface User {
    id: string;
    roles?: string[];
  }

  interface JWT {
    id: string;
    roles: string[];
  }
}
