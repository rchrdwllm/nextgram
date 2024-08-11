import * as z from "zod";

export const deletePostSchema = z.object({
  postId: z.string(),
});
