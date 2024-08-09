import { db } from "@/server";

export const getPosts = async () => {
  const posts = await db.query.posts.findMany({
    with: {
      postImages: true,
      user: true,
      postLikes: true,
    },
  });

  if (!posts) {
    return { error: "Failed to fetch posts" };
  }

  return { success: posts };
};
