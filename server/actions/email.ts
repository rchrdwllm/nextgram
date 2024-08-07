"use server";

import { Resend } from "resend";
import getBaseUrl from "@/lib/base-url";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerificationToken = async (
  email: string,
  token: string
) => {
  const { data, error } = await resend.emails.send({
    from: "Nextgram <onboarding@resend.dev>",
    to: [email],
    subject: "Nextgram - Email Verification",
    html: `<h1>Verify your email</h1>
      <p>Click <a href="${getBaseUrl()}/verify?token=${token}">here</a> to verify your email address.</p>`,
  });

  return {
    success: data,
    error,
  };
};

export const sendPasswordResetToken = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: "Nextgram <onboarding@resend.dev>",
    to: [email],
    subject: "Nextgram - Password Reset",
    html: `<h1>Reset your password</h1>
      <p>Click <a href="${getBaseUrl()}/reset-password-verification?token=${token}">here</a> to reset your password.</p>`,
  });

  return {
    success: data,
    error,
  };
};
