"use server";

import { deleteReplySchema } from "@/form_schemas/delete-reply-schema";
import { actionClient } from "./action-client";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { eq } from "drizzle-orm";
import { postReplies } from "../schema";

export const deleteReply = actionClient
  .schema(deleteReplySchema)
  .action(async ({ parsedInput }) => {
    const { replyId } = parsedInput;

    try {
      const reply = await db.query.postReplies.findFirst({
        where: eq(postReplies.id, replyId),
      });

      if (!reply) {
        return { error: "Reply not found" };
      }

      await db.delete(postReplies).where(eq(postReplies.id, replyId));

      return {
        success: "Reply deleted",
      };
    } catch (error) {
      return { error: "Error deleting reply" };
    } finally {
      revalidatePath("/feed");
    }
  });
