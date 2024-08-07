"use server";

import { resetPasswordSchema } from "@/form_schemas/reset-password-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { eq } from "drizzle-orm";
import { accounts, users } from "../schema";
import { generatePasswordResetToken } from "./tokens";
import { sendPasswordResetToken } from "./email";

export const resetPassword = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!existingUser) {
        return { error: "No user found with that email address" };
      }

      const isOAuth = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      if (isOAuth) {
        const provider =
          isOAuth.provider.charAt(0).toUpperCase() + isOAuth.provider.slice(1);

        return {
          error: `Cannot reset password for OAuth users. Try logging in instead using ${provider}, the provider you used when signing up.`,
        };
      }

      const token = await generatePasswordResetToken(email);
      const { error } = await sendPasswordResetToken(email, token);

      if (error) {
        return { error: "Failed to send reset password email" };
      }

      return {
        success: "Password reset email sent",
      };
    } catch (error) {
      return { error: "Failed to send reset password email" };
    }
  });
