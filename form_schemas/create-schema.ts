import * as z from "zod";

export const createSchema = z.object({
  caption: z.optional(z.string()),
  images: z.array(
    z.object({
      url: z.string(),
      key: z.string(),
      name: z.string(),
      size: z.number(),
    })
  ),
});
