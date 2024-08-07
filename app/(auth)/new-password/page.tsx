import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getPasswordResetTokenByToken } from "@/server/actions/tokens";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import NewPasswordForm from "@/components/auth/new-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewPasswordPage = async ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  if (!token) return redirect("/");

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken)
    return (
      <Alert variant="destructive">
        <X className="h-4 w-4" />
        <AlertTitle>Token not found!</AlertTitle>
        <AlertDescription>The token provided is not valid.</AlertDescription>
      </Alert>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <NewPasswordForm />
      </CardContent>
    </Card>
  );
};

export default NewPasswordPage;
