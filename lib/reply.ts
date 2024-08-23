import { db } from "@/server";
import { postReplies } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export const getPostReplyIdsByPostId = async (postId: string) => {
  try {
    const result = await db
      .select({
        replyId: postReplies.id,
      })
      .from(postReplies)
      .where(eq(postReplies.postId, postId))
      .orderBy(desc(postReplies.createdAt));

    if (!result) {
      return { error: "Error getting post reply ids" };
    }

    const postReplyIds = result.map(({ replyId }) => replyId);

    return { success: postReplyIds };
  } catch (error) {
    return { error: "Error getting post reply ids" };
  }
};

export const getReplyById = async (id: number) => {
  try {
    const reply = await db.query.postReplies.findFirst({
      where: eq(postReplies.id, id),
    });

    if (!reply) {
      return { error: "Reply not found" };
    }

    return { success: reply };
  } catch (error) {
    return { error: "Error getting reply" };
  }
};
