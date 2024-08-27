import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { accounts, twoFactorTokens, users } from "./schema";
import { loginSchema } from "@/form_schemas/login-schema";
import bcrypt from "bcrypt";
import { knockClient } from "./knock";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password, code } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (code) {
            const token = await db.query.twoFactorTokens.findFirst({
              where: eq(twoFactorTokens.token, code),
            });

            if (!token) return null;

            if (token.expires < new Date()) {
              return null;
            }

            if (!user) return null;

            return user;
          }

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });

      if (!existingUser) return token;

      const oAuthAccount = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      token.isOAuth = !!oAuthAccount;
      token.twoFactorEnabled = existingUser.twoFactorEnabled;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.emailVerified = existingUser.emailVerified;
      token.bio = existingUser.bio;

      return token;
    },
    session: async ({ token, session }) => {
      if (session && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.twoFactorEnabled = token.twoFactorEnabled as boolean;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.bio = token.bio as string;

        if (token.image) {
          session.user.image = token.image as string;
        }
      }

      if (session.user.isOAuth) {
        session.user.image = token.image as string;
      }

      return session;
    },
    signIn: async ({ account, profile, user }) => {
      if (account && profile) {
        if (account.provider === "google") {
          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, profile.email!),
          });

          const existingAccount = await db.query.accounts.findFirst({
            where: eq(accounts.providerAccountId, account.providerAccountId),
          });

          if (!existingUser) {
            await knockClient.users.identify(user.id!, {
              name: user.name ?? undefined,
              email: user.email!,
            });
          }

          if (existingUser && !existingAccount) {
            throw new Error(
              `You used a Google account to sign in. However, a Nextgram account already exists for ${profile.email}. Please sign in with email and password instead.`
            );
          }

          return true;
        }
      }

      if (account) {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.id, account.providerAccountId),
        });

        if (!existingUser) throw new Error("User not found");
      }

      return true;
    },
  },
});
