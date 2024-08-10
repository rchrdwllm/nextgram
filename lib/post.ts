import { db } from "@/server";
import { posts } from "@/server/schema";
import { desc, eq, inArray } from "drizzle-orm";

export const getPostIds = async () => {
  //   const result = await db
  //     .select({
  //       postId: posts.id,
  //     })
  //     .from(posts)
  //     .orderBy(desc(posts.createdAt));

  //   if (!result) {
  //     return { error: "Failed to fetch posts" };
  //   }

  const result = await db.query.posts.findMany({
    orderBy: desc(posts.createdAt),
  });

  const postIds = result.map((post) => post.id);

  return { success: postIds };
};

export const getPostById = async (postId: string) => {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
    });

    return { success: post };
  } catch (error) {
    return { error: "Failed to get post" };
  }
};

export const getPostsByUserId = async (userId: string) => {
  try {
    // const result = await db
    //   .select({
    //     postId: posts.id,
    //   })
    //   .from(posts)
    //   .orderBy(desc(posts.createdAt))
    //   .where(eq(posts.userId, userId));

    const result = await db.query.posts.findMany({
      where: eq(posts.userId, userId),
      orderBy: desc(posts.createdAt),
    });

    if (!result) {
      return { error: "Failed to fetch posts" };
    }

    const postIds = result.map((post) => post.id);

    return { success: postIds };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};

export const getPostsByIds = async (postIds: string[]) => {
  try {
    const allPosts = await db.query.posts.findMany({
      where: inArray(posts.id, postIds),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
    });

    return { success: allPosts };
  } catch (error) {
    return { error: "Failed to get post" };
  }
};
