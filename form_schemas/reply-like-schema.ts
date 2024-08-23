import * as z from "zod";

export const replyLikeSchema = z.object({
  replyId: z.number(),
});
