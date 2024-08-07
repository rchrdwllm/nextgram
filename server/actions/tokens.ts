"use server";

import crypto from "crypto";
import { db } from "..";
import { eq } from "drizzle-orm";
import { emailVerificationTokens, users } from "../schema";

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.query.emailVerificationTokens.findFirst({
    where: eq(emailVerificationTokens.email, email),
  });

  if (existingToken) {
    await db
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.email, email));
  }

  await db.insert(emailVerificationTokens).values({
    email,
    token,
    expires,
  });

  return token;
};

export const verifyEmail = async (token: string) => {
  const existingToken = await db.query.emailVerificationTokens.findFirst({
    where: eq(emailVerificationTokens.token, token),
  });

  if (!existingToken) {
    return { error: "Token not found" };
  }

  if (existingToken.expires < new Date()) {
    return { error: "Token expired" };
  }

  await db.update(users).set({
    emailVerified: new Date(),
  });

  await db
    .delete(emailVerificationTokens)
    .where(eq(emailVerificationTokens.token, token));

  return { success: "Email successfully verified" };
};
