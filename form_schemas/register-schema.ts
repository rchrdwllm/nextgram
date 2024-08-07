import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, {
    message: "Enter at least 1 character",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Enter at least 8 characters",
  }),
});
