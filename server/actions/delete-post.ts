"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { postImages, posts } from "../schema";
import { actionClient } from "./action-client";
import { deletePostSchema } from "@/form_schemas/delete-post-schema";
import { revalidatePath } from "next/cache";
import { deleteUploadthingImages } from "@/lib/uploadthing";

export const deletePost = actionClient
  .schema(deletePostSchema)
  .action(async ({ parsedInput }) => {
    const { postId } = parsedInput;

    try {
      const postImageKeysResult = await db
        .select({
          key: postImages.key,
        })
        .from(postImages)
        .where(eq(postImages.postId, postId));

      if (!postImageKeysResult.length) {
        return { error: "Post does not exist" };
      }

      const postImageKeys = postImageKeysResult.map((image) => image.key);

      const { error } = await deleteUploadthingImages(postImageKeys);

      if (error) {
        return { error: "Failed to delete images" };
      }

      const deletedPost = await db.delete(posts).where(eq(posts.id, postId));

      if (!deletedPost) {
        return { error: "Failed to delete post" };
      }

      return { success: "Post deleted" };
    } catch (error) {
      return { error: "Failed to delete post" };
    } finally {
      revalidatePath("/feed");
      revalidatePath("/(user)/user/[id]", "page");
      revalidatePath("/posts");
    }
  });
