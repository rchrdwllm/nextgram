import * as z from "zod";

export const likeSchema = z.object({
  postId: z.string(),
});
