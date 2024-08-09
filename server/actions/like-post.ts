"use server";

import { eq, and } from "drizzle-orm";
import { db } from "..";
import { auth } from "../auth";
import { postLikes } from "../schema";
import { actionClient } from "./action-client";
import { likeSchema } from "@/form_schemas/like-schema";

export const likePost = actionClient
  .schema(likeSchema)
  .action(async ({ parsedInput }) => {
    const { postId } = parsedInput;
    const session = await auth();

    if (!session) {
      return { error: "You must be logged in to like posts" };
    }

    try {
      const existingPostLike = await db.query.postLikes.findFirst({
        where: and(
          eq(postLikes.postId, postId),
          eq(postLikes.userId, session.user.id)
        ),
      });

      if (existingPostLike) {
        await db.delete(postLikes).where(eq(postLikes.id, existingPostLike.id));

        return { success: "Post unliked" };
      }

      await db.insert(postLikes).values({
        postId,
        userId: session.user.id,
      });

      return { success: "Post liked" };
    } catch (error) {
      return { error: "Failed to like post" };
    }
  });
