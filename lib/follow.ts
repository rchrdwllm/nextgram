import { db } from "@/server";
import { follows } from "@/server/schema";
import { eq } from "drizzle-orm";

export const getUserFollowerIds = async (userId: string) => {
  try {
    const userFollowers = await db
      .select({
        followerId: follows.followerId,
      })
      .from(follows)
      .where(eq(follows.followingId, userId));

    if (!userFollowers) {
      return { error: "No followers found" };
    }

    const followerIds = userFollowers.map((follower) => follower.followerId);

    return { success: followerIds };
  } catch (error) {
    return { error: "Error getting followers" };
  }
};

export const getUserFollowingIds = async (userId: string) => {
  try {
    const userFollowing = await db
      .select({
        followingId: follows.followingId,
      })
      .from(follows)
      .where(eq(follows.followerId, userId));

    if (!userFollowing) {
      return { error: "No following found" };
    }

    const followingIds = userFollowing.map(
      (following) => following.followingId
    );

    return { success: followingIds };
  } catch (error) {
    return { error: "Error getting following" };
  }
};
