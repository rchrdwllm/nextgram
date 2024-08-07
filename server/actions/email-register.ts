"use server";

import { registerSchema } from "@/form_schemas/register-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import bcrypt from "bcrypt";
import { sendEmailVerificationToken } from "./email";
import { generateEmailVerificationToken } from "./tokens";

export const emailRegister = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const { email, password, name } = parsedInput;

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const token = await generateEmailVerificationToken(email);
        const { error } = await sendEmailVerificationToken(email, token);

        if (error) {
          return { error: "Failed to send verification email" };
        }

        return { success: "Verification email sent!" };
      }

      return { error: "Email already in use" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    const token = await generateEmailVerificationToken(email);
    const { error } = await sendEmailVerificationToken(email, token);

    if (error) {
      return { error: "Failed to send verification email" };
    }

    return { success: "Verification email sent!" };
  });
