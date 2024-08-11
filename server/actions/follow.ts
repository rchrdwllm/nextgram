"use server";

import { followSchema } from "@/form_schemas/follow-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { and, eq } from "drizzle-orm";
import { follows } from "../schema";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const follow = actionClient
  .schema(followSchema)
  .action(async ({ parsedInput }) => {
    const { followerId, followingId } = parsedInput;
    const session = await auth();

    if (!session) {
      return { error: "Not logged in" };
    }

    try {
      const existingFollow = await db.query.follows.findFirst({
        where: and(
          eq(follows.followerId, followerId),
          eq(follows.followingId, followingId)
        ),
      });

      if (existingFollow) {
        await db.delete(follows).where(eq(follows.id, existingFollow.id));

        return { success: "Unfollowed user" };
      }

      await db.insert(follows).values({
        followerId,
        followingId,
      });

      return { success: "Followed user" };
    } catch (error) {
      return { error: "Error following/unfollowing" };
    } finally {
      revalidatePath("/(user)/user/[id]", "page");
    }
  });
