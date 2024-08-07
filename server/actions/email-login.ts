"use server";

import { loginSchema } from "@/form_schemas/login-schema";
import { actionClient } from "./action-client";
import { signIn } from "../auth";

export const emailLogin = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
        redirect: false,
      });

      return { success: "User logged in" };
    } catch (error) {
      console.log(error);
      return { error: "Failed to log in" };
    }
  });
