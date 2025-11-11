import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Providers from "@/components/auth/providers";
import { Separator } from "@/components/ui/separator";
import RegisterForm from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <Card className="lg:p-8">
      <CardHeader>
        <CardTitle>Welcome to Nextgram!</CardTitle>
        <CardDescription>
          Enter your credentials to create an account or login with a provider
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
