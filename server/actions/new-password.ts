"use server";

import { newPasswordSchema } from "@/form_schemas/new-password-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { accounts, passwordResetTokens, users } from "../schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const newPassword = actionClient
  .schema(newPasswordSchema)
  .action(async ({ parsedInput }) => {
    const { password, token } = parsedInput;

    if (!token) {
      return { error: "Token is required" };
    }

    if (!password) {
      return { error: "Password is required" };
    }

    try {
      const existingToken = await db.query.passwordResetTokens.findFirst({
        where: eq(passwordResetTokens.token, token),
      });

      if (!existingToken) {
        return { error: "Token not found" };
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, existingToken.email),
      });

      if (!existingUser) {
        return { error: "User not found" };
      }

      const isOAuth = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      console.log(isOAuth);

      if (isOAuth) {
        return { error: "Cannot reset password for OAuth users" };
      }

      const isSameBefore = await bcrypt.compare(
        existingUser.password!,
        password
      );

      if (isSameBefore) {
        return { error: "Passwords must not be the same as before" };
      }

      const newHashedPassword = await bcrypt.hash(password, 10);

      await db
        .update(users)
        .set({
          password: newHashedPassword,
        })
        .where(eq(users.id, existingUser.id));

      return { success: "Password reset successfully" };
    } catch (error) {
      return { error: "Failed to reset password" };
    }
  });
