/* eslint-disable no-unused-vars */
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    credits: number;
  }
}

declare module "next-auth" {
  interface User {
    id: UserId;
    username?: string | null;
    credits: number;
  }
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
      credits: number;
    };
  }
}
