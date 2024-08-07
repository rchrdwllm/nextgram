"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/form_schemas/reset-password-schema";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/server/actions/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const { execute, status } = useAction(resetPassword, {
    onExecute: () => {
      toast.loading("Sending password reset email...");
    },
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);

        router.push("/login");
      }

      if (data?.error) {
        toast.dismiss();
        toast.error(data.error);
      }
    },
  });

  const handleSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn(
            "w-full",
            status === "executing" ? "animate-pulse pointer-events-none" : ""
          )}
        >
          Send reset link
        </Button>
        <div className="mt-4 flex justify-center">
          <Link href="/login">
            <Button
              variant="link"
              className="px-0 text-muted-foreground transition-colors hover:text-primary"
            >
              Back to login
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
