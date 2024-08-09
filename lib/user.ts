import { db } from "@/server";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";

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
