"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { verifyEmail } from "@/server/actions/tokens";
import { Check, Loader, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPage = ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    const { success, error } = await verifyEmail(token);

    if (success) {
      setSuccess(success);

      router.replace("/login");
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
            Redirecting you to the login page...
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
            Please wait while we verify your email address
          </AlertDescription>
        </>
      )}
    </Alert>
  );
};

export default VerifyPage;
