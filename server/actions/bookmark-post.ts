"use server";

import { bookmarkSchema } from "@/form_schemas/bookmark-schema";
import { actionClient } from "./action-client";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { postBookmarks } from "../schema";
import { and, eq } from "drizzle-orm";

export const bookmarkPost = actionClient
  .schema(bookmarkSchema)
  .action(async ({ parsedInput }) => {
    const { postId } = parsedInput;
    const session = await auth();

    if (!session) {
      return { error: "You must be logged in to bookmark a post" };
    }

    try {
      const existingBookmark = await db.query.postBookmarks.findFirst({
        where: and(
          eq(postBookmarks.postId, postId),
          eq(postBookmarks.userId, session.user.id)
        ),
      });

      if (existingBookmark) {
        await db
          .delete(postBookmarks)
          .where(eq(postBookmarks.id, existingBookmark.id));

        return { success: "Post unbookmarked" };
      }

      await db.insert(postBookmarks).values({
        postId,
        userId: session.user.id,
      });

      return { success: "Post bookmarked" };
    } catch (error) {
      return { error: "Failed to bookmark post" };
    } finally {
      revalidatePath("/feed");
      revalidatePath("/(user)/user/[id]", "page");
    }
  });
