import * as z from "zod";

export const bookmarkSchema = z.object({
  postId: z.string(),
});
