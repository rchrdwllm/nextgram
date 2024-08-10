import { db } from "@/server";
import { auth } from "@/server/auth";
import { postBookmarks, postLikes, posts } from "@/server/schema";
import { and, desc, eq, inArray } from "drizzle-orm";

export const getPosts = async () => {
  const allPosts = await db.query.posts.findMany({
    with: {
      postImages: true,
      user: true,
      postLikes: true,
      postBookmarks: true,
    },
    orderBy: desc(posts.createdAt),
  });

  if (!allPosts) {
    return { error: "Failed to fetch posts" };
  }

  return { success: allPosts };
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
    const userPosts = await db.query.posts.findMany({
      where: eq(posts.userId, userId),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
      orderBy: desc(posts.createdAt),
    });

    return { success: userPosts };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};

export const getPostsByUserLike = async (userId: string) => {
  try {
    const userPostLikes = await db.query.postLikes.findMany({
      where: eq(postLikes.userId, userId),
    });

    if (!userPostLikes) {
      return { error: "Failed to get posts" };
    }

    const postIds = userPostLikes.map((postLike) => postLike.postId);

    const likedPosts = await db.query.posts.findMany({
      where: inArray(posts.id, postIds),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
    });

    if (!likedPosts) {
      return { error: "Failed to get posts" };
    }

    return { success: likedPosts };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};

export const getPostsByUserBookmark = async (userId: string) => {
  try {
    const userPostBookmarks = await db.query.postBookmarks.findMany({
      where: eq(postBookmarks.userId, userId),
    });

    if (!userPostBookmarks) {
      return { error: "Failed to get posts" };
    }

    const postIds = userPostBookmarks.map(
      (postBookmark) => postBookmark.postId
    );

    const bookmarkedPosts = await db.query.posts.findMany({
      where: inArray(posts.id, postIds),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
    });

    if (!bookmarkedPosts) {
      return { error: "Failed to get posts" };
    }

    return { success: bookmarkedPosts };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};

export const getCurrentUserLikedPosts = async () => {
  const session = await auth();

  if (!session) {
    return { error: "You need to be logged in to view this page" };
  }

  try {
    const userPostLikes = await db.query.postLikes.findMany({
      where: eq(postLikes.userId, session.user.id),
    });

    if (!userPostLikes) {
      return { error: "Failed to get posts" };
    }

    const postIds = userPostLikes.map((postLike) => postLike.postId);

    const likedPosts = await db.query.posts.findMany({
      where: inArray(posts.id, postIds),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
    });

    if (!likedPosts) {
      return { error: "Failed to get posts" };
    }

    return { success: likedPosts };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};
