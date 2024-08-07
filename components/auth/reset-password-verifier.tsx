"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { verifyPasswordToken } from "@/server/actions/tokens";
import { Check, Loader, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPasswordVerifier = ({ token }: { token: string }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    const { success, error } = await verifyPasswordToken(token);

    if (success) {
      setSuccess(success);

      router.replace(`/new-password?token=${token}`);
    } else if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <Alert variant={error ? "destructive" : "default"}>
      {success ? (
        <>
          <Check className="h-4 w-4" />
          <AlertTitle>Successfully verified!</AlertTitle>
          <AlertDescription>
            Redirecting you to the reset page...
          </AlertDescription>
        </>
      ) : error ? (
        <>
          <X className="h-4 w-4" />
          <AlertTitle>Failed to verify!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </>
      ) : (
        <>
          <Loader className="h-4 w-4 animate-spin" />
          <AlertTitle>Verifying email...</AlertTitle>
          <AlertDescription>
            Please wait while we verify your email address for password reset
          </AlertDescription>
        </>
      )}
    </Alert>
  );
};

export default ResetPasswordVerifier;
