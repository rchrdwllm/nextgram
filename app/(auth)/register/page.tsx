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
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
