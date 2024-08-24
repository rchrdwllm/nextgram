"use server";

import { eq, and } from "drizzle-orm";
import { db } from "..";
import { auth } from "../auth";
import { postImages, postLikes, posts } from "../schema";
import { actionClient } from "./action-client";
import { likeSchema } from "@/form_schemas/like-schema";
import { revalidatePath } from "next/cache";
import { knockClient } from "../knock";

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

      const [postAuthor] = await db
        .select({
          userId: posts.userId,
        })
        .from(posts)
        .where(eq(posts.id, postId));
      const [postImagePreview] = await db
        .select({
          img: postImages.url,
        })
        .from(postImages)
        .where(eq(postImages.postId, postId));

      if (!postAuthor || !postImagePreview) {
        return { error: "Failed to like post" };
      }

      if (postAuthor.userId !== session.user.id) {
        const notification = await knockClient.workflows.trigger("new-like", {
          recipients: [postAuthor.userId!],
          actor: session.user.id,
          data: {
            post_img_preview: postImagePreview.img,
            post_id: postId,
            post_user_id: postAuthor.userId,
          },
        });
      }

      return { success: "Post liked" };
    } catch (error) {
      console.log(error);
      return { error: "Failed to like post" };
    } finally {
      revalidatePath("/feed");
      revalidatePath("/(user)/user/[id]", "page");
    }
  });
