"use server";

import { loginSchema } from "@/form_schemas/login-schema";
import { actionClient } from "./action-client";
import { signIn } from "../auth";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendEmailVerificationToken } from "./email";

export const emailLogin = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!existingUser) {
        return { error: "Invalid email or password" };
      }

      if (!existingUser.emailVerified) {
        const token = await generateEmailVerificationToken(email);
        const { error } = await sendEmailVerificationToken(email, token);

        if (error) {
          return { error: "Failed to send verification email" };
        }

        return { emailSuccess: "Verification email sent!" };
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
        redirect: false,
      });

      return { success: "Login successful, redirecting..." };
    } catch (error) {
      return { error: "Failed to log in" };
    }
  });
