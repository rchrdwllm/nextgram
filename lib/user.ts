import { db } from "@/server";
import { postBookmarks, postLikes, posts, users } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export const getUserById = async (userId: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    return { success: user };
  } catch (error) {
    return { error: "Failed to get user" };
  }
};

export const getUserByIdWithPosts = async (userId: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        posts: {
          orderBy: desc(posts.createdAt),
        },
        postLikes: {
          orderBy: desc(postLikes.createdAt),
        },
        postBookmarks: {
          orderBy: desc(postBookmarks.createdAt),
        },
      },
    });

    return { success: user };
  } catch (error) {
    return { error: "Failed to get user" };
  }
};
