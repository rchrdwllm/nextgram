import * as z from "zod";

export const deleteImageSchema = z.object({
  key: z.string(),
});
