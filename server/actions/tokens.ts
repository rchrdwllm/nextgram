"use server";

import crypto from "crypto";
import { db } from "..";
import { eq } from "drizzle-orm";
import {
  emailVerificationTokens,
  passwordResetTokens,
  twoFactorTokens,
  users,
} from "../schema";
import bcrypt from "bcrypt";
import { knockClient } from "../knock";

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

  const [user] = await db
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .returning();

  await db
    .delete(emailVerificationTokens)
    .where(eq(emailVerificationTokens.token, token));

  await knockClient.users.identify(user.id, {
    name: user.name ?? "",
    email: user.email,
  });

  return { success: "Email successfully verified" };
};

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.email, email),
  });

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email));
  }

  await db.insert(passwordResetTokens).values({
    email,
    token,
    expires,
  });

  return token;
};

export const verifyPasswordToken = async (token: string) => {
  const existingToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
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

  return { success: "Email successfully verified" };
};

export const getPasswordResetTokenByToken = async (token: string) => {
  const existingToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  });

  return existingToken;
};

export const generate2FAToken = async (email: string, password: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.query.twoFactorTokens.findFirst({
    where: eq(twoFactorTokens.email, email),
  });

  if (existingToken) {
    await db.delete(twoFactorTokens).where(eq(twoFactorTokens.email, email));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(twoFactorTokens).values({
    email,
    token,
    expires,
    password: hashedPassword,
  });

  return token;
};
