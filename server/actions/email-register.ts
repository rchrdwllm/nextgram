"use server";

import { registerSchema } from "@/form_schemas/register-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import bcrypt from "bcrypt";

export const emailRegister = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const { email, password, name } = parsedInput;

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return { success: "User registered" };
  });
