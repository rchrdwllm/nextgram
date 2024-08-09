import * as z from "zod";

export const settingsSchema = z.object({
  id: z.string(),
  name: z.optional(
    z
      .string()
      .min(1, {
        message: "Enter at least one character",
      })
      .max(50, {
        message: "Enter no more than 50 characters",
      })
  ),
  email: z.optional(
    z.string().email({
      message: "Enter a valid email",
    })
  ),
  bio: z.optional(z.string()),
  currentPassword: z.optional(
    z.string().min(8, {
      message: "Enter at least 8 characters",
    })
  ),
  newPassword: z.optional(
    z.string().min(8, {
      message: "Enter at least 8 characters",
    })
  ),
  image: z.optional(z.string()),
  twoFactorEnabled: z.optional(z.boolean()),
});
