import { db } from "@/server";
import { lower, users } from "@/server/schema";
import { eq, like, or } from "drizzle-orm";

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

export const getUsersByQuery = async (q: string) => {
  try {
    const usersResult = await db
      .select({
        userId: users.id,
      })
      .from(users)
      .where(
        or(
          like(lower(users.name), "%" + q + "%"),
          like(lower(users.email), "%" + q + "%")
        )
      );

    if (!usersResult) {
      return { error: "Failed to fetch users" };
    }

    const userIds = usersResult.map((user) => user.userId);

    return { success: userIds };
  } catch (error) {
    return { error: "Failed to get users" };
  }
};
