import * as z from "zod";

export const deleteReplySchema = z.object({
  replyId: z.number(),
});
