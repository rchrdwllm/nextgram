"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { actionClient } from "./action-client";
import { settingsSchema } from "@/form_schemas/settings-schema";
import { accounts, users } from "../schema";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { knockClient } from "../knock";

export const updateSettings = actionClient
  .schema(settingsSchema)
  .action(async ({ parsedInput }) => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, parsedInput.id),
      });

      if (!user) {
        return { error: "User to update not found" };
      }

      if (parsedInput.email && parsedInput.email !== user.email) {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, parsedInput.email),
        });

        if (existingUser) {
          return { error: "User with this email already exists" };
        }
      }

      const oAuthAccount = await db.query.accounts.findFirst({
        where: eq(accounts.userId, parsedInput.id),
      });

      if (oAuthAccount) {
        parsedInput.email = undefined;
        parsedInput.currentPassword = undefined;
        parsedInput.newPassword = undefined;
        parsedInput.twoFactorEnabled = undefined;
      }

      if (
        parsedInput.currentPassword &&
        parsedInput.newPassword &&
        user.password
      ) {
        const passwordMatch = await bcrypt.compare(
          parsedInput.currentPassword,
          user.password
        );

        if (!passwordMatch) {
          return { error: "Passwords do not match" };
        }

        const samePassword = await bcrypt.compare(
          parsedInput.newPassword,
          user.password
        );

        if (samePassword) {
          return { error: "New password must be different from the old one" };
        }

        const newHashedPassword = await bcrypt.hash(
          parsedInput.newPassword,
          10
        );

        await db
          .update(users)
          .set({
            ...parsedInput,
            password: newHashedPassword,
          })
          .where(eq(users.id, parsedInput.id));

        return { success: "User settings updated" };
      }

      await db
        .update(users)
        .set({
          ...parsedInput,
        })
        .where(eq(users.id, parsedInput.id));

      await knockClient.users.delete(parsedInput.id);

      await knockClient.users.identify(parsedInput.id, {
        name: parsedInput.name ?? "",
        email: parsedInput.email,
      });

      return { success: "User settings updated" };
    } catch (error) {
      return { error: "Failed to update settings" };
    } finally {
      revalidatePath("/dashboard/settings");
      revalidatePath("/(user)/user/[id]", "page");
    }
  });
