import * as z from "zod";

export const replySchema = z.object({
  content: z.string().min(1, {
    message: "Content is required",
  }),
  postId: z.optional(z.string()),
  replyId: z.optional(z.number()),
});
