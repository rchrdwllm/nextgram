"use server";

import { twoFactorSchema } from "@/form_schemas/two-factor-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { eq } from "drizzle-orm";
import { twoFactorTokens } from "../schema";
import { signIn } from "../auth";

export const twoFactorLogin = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput }) => {
    const { code } = parsedInput;

    try {
      const token = await db.query.twoFactorTokens.findFirst({
        where: eq(twoFactorTokens.token, code),
      });

      if (!token) {
        return { error: "Invalid code" };
      }

      await signIn("credentials", {
        email: token.email,
        code,
        password: token.password,
        redirectTo: "/",
        redirect: false,
      });

      return { success: "Login successful, redirecting..." };
    } catch (error) {
      return { error: "Failed to log in" };
    }
  });
