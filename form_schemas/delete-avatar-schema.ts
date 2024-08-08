import * as z from "zod";

export const deleteAvatarSchema = z.object({
  fileKey: z.string().min(1, {
    message: "Enter at least one character",
  }),
});
