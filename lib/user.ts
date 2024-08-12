import { db } from "@/server";
import { auth } from "@/server/auth";
import { lower, users } from "@/server/schema";
import { eq, like, not, or } from "drizzle-orm";

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

export const getUsersByLimit = async (limit: number) => {
  const session = await auth();

  if (!session) {
    return { error: "You must be logged in to view this page" };
  }

  try {
    const usersResult = await db
      .select({
        userId: users.id,
      })
      .from(users)
      .where(not(eq(users.id, session.user.id)))
      .limit(limit);

    if (!usersResult) {
      return { error: "Failed to fetch users" };
    }

    const userIds = usersResult.map((user) => user.userId);

    return { success: userIds };
  } catch (error) {
    return { error: "Failed to get users" };
  }
};
