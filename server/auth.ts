import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { accounts, users } from "./schema";
import { loginSchema } from "@/form_schemas/login-schema";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET!,
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
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

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

      return token;
    },
    session: async ({ token, session }) => {
      if (session && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.twoFactorEnabled = token.twoFactorEnabled as boolean;
        session.user.image = token.image as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
  },
});
