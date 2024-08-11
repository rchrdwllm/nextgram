"use server";

import { createSchema } from "@/form_schemas/create-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { postImages, posts } from "../schema";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { eq, inArray } from "drizzle-orm";
import { deleteUploadthingImages } from "@/lib/uploadthing";

export const createPost = actionClient
  .schema(createSchema)
  .action(async ({ parsedInput }) => {
    const { caption, images, postId } = parsedInput;
    const session = await auth();

    if (!session) {
      return { error: "You must be logged in to create a post" };
    }

    if (!parsedInput.images.length) {
      return { error: "You must upload at least one image" };
    }

    if (postId) {
      try {
        const existingPostImages = await db
          .select({
            id: postImages.id,
            key: postImages.key,
          })
          .from(postImages)
          .where(eq(postImages.postId, postId));

        if (!existingPostImages.length) {
          return { error: "Post does not exist" };
        }

        const updatedPost = await db
          .update(posts)
          .set({
            caption,
          })
          .where(eq(posts.id, postId))
          .returning();

        if (!updatedPost) {
          return { error: "Failed to update post" };
        }

        const deletedImages = await db
          .delete(postImages)
          .where(
            inArray(
              postImages.id,
              existingPostImages.map((image) => image.id)
            )
          )
          .returning();

        if (!deletedImages) {
          return { error: "Failed to delete images" };
        }

        const { error } = await deleteUploadthingImages(
          existingPostImages.map((image) => image.key)
        );

        if (error) {
          return { error: "Failed to delete images" };
        }

        images.forEach(async (image) => {
          await db.insert(postImages).values({
            ...image,
            postId,
          });
        });

        return { success: "Post updated" };
      } catch (error) {
        return { error: "Failed to update post" };
      } finally {
        revalidatePath("/feed");
        revalidatePath("/(user)/user/[id]", "page");
        revalidatePath("/posts");
      }
    }

    try {
      const [newPost] = await db
        .insert(posts)
        .values({
          caption,
          userId: session.user.id,
        })
        .returning();

      if (!newPost) {
        return { error: "Failed to create post" };
      }

      images.forEach(async (image) => {
        await db.insert(postImages).values({
          ...image,
          postId: newPost.id,
        });
      });

      return { success: "Post created" };
    } catch (error) {
      return { error: "Failed to create post" };
    } finally {
      revalidatePath("/feed");
      revalidatePath("/(user)/user/[id]", "page");
      revalidatePath("/posts");
    }
  });
