import ResetPasswordVerifier from "@/components/auth/reset-password-verifier";
import { redirect } from "next/navigation";

const ResetPasswordVerifyPage = ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  if (!token) return redirect("/");

  return <ResetPasswordVerifier token={token} />;
};

export default ResetPasswordVerifyPage;
