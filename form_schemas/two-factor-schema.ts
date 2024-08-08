import * as z from "zod";

export const twoFactorSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Code must be 6 digits",
    })
    .max(6),
});
