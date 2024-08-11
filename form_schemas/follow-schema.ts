import * as z from "zod";

export const followSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
});
