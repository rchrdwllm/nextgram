import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Providers from "@/components/auth/providers";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <Card className="lg:p-8">
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>
          Enter your credentials or log in with a provider
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
