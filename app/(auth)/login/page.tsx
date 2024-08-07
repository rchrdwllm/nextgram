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
    <Card>
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>
          Enter your credentials or log in with a provider
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Providers />
        <div className="relative h-8 flex items-center">
          <Separator className="w-full" />
          <span
            className="uppercase block bg-card px-4 text-muted-foreground text-xs"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            or continue with
          </span>
        </div>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
