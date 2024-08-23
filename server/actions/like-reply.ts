"use server";

import { replyLikeSchema } from "@/form_schemas/reply-like-schema";
import { actionClient } from "./action-client";
import { auth } from "../auth";
import { db } from "..";
import { postReplyLikes } from "../schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const likeReply = actionClient
  .schema(replyLikeSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    const { replyId } = parsedInput;

    if (!session) {
      return { error: "You must be logged in to like a reply" };
    }

    try {
      const existingLike = await db.query.postReplyLikes.findFirst({
        where: and(
          eq(postReplyLikes.postReplyId, replyId),
          eq(postReplyLikes.userId, session.user.id)
        ),
      });

      console.log({ existingLike });

      if (existingLike) {
        const deletedLike = await db
          .delete(postReplyLikes)
          .where(eq(postReplyLikes.id, existingLike.id))
          .returning();

        return { success: deletedLike };
      }

      const replyLike = await db
        .insert(postReplyLikes)
        .values({
          postReplyId: replyId,
          userId: session.user.id,
        })
        .returning();

      if (!replyLike) {
        return { error: "Something went wrong" };
      }

      return { success: replyLike };
    } catch (error) {
      return { error: "Something went wrong" };
    } finally {
      revalidatePath("/feed");
      revalidatePath("/(user)/user/[id]", "page");
    }
  });
