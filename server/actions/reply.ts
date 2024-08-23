"use server";

import { db } from "..";
import { auth } from "../auth";
import { postReplies } from "../schema";
import { actionClient } from "./action-client";
import { replySchema } from "@/form_schemas/reply-schema";
import { revalidatePath } from "next/cache";

export const reply = actionClient
  .schema(replySchema)
  .action(async ({ parsedInput }) => {
    const { content, postId } = parsedInput;
    const session = await auth();

    if (!session) {
      return { error: "You must be logged in to reply to posts" };
    }

    try {
      const newPostReply = await db
        .insert(postReplies)
        .values({
          content,
          postId,
          userId: session.user.id,
        })
        .returning();

      if (!newPostReply) {
        return { error: "Error creating post reply" };
      }

      return {
        success: "Post reply created",
      };
    } catch (error) {
      return { error: "Error creating post reply" };
    } finally {
      revalidatePath("/feed");
    }
  });
