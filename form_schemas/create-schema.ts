import * as z from "zod";

export const createSchema = z.object({
  caption: z.optional(z.string()),
  images: z
    .array(
      z.object({
        url: z.string(),
        key: z.string(),
        name: z.string(),
        size: z.number(),
      })
    )
    .nonempty({
      message: "You must upload at least one image",
    }),
  postId: z.optional(z.string()),
});
