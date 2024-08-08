import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TwoFactorForm from "@/components/auth/two-factor-form";

const TwoFactorPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-factor Auth</CardTitle>
        <CardDescription>
          We've sent you a code to your email. Enter it below to verify your
          identity.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TwoFactorForm />
      </CardContent>
    </Card>
  );
};

export default TwoFactorPage;
