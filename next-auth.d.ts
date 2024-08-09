import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
  id: string;
  twoFactorEnabled: boolean;
  isOAuth: boolean;
  image: string;
  bio: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }

  interface User extends ExtendUser {}
}
