import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "@/components/auth/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your email address and we will send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
