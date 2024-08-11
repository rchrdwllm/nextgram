"use server";

import { createSchema } from "@/form_schemas/create-schema";
import { actionClient } from "./action-client";
import { db } from "..";
import { postImages, posts } from "../schema";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { eq } from "drizzle-orm";

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
        await db
          .update(posts)
          .set({
            caption,
          })
          .where(eq(posts.id, postId));

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
