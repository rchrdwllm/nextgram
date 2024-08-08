import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Enter at least 8 characters",
  }),
  code: z.optional(z.string().min(6).max(6)),
});
