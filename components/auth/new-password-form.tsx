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
import { newPasswordSchema } from "@/form_schemas/new-password-schema";
import { cn } from "@/lib/utils";
import { newPassword } from "@/server/actions/new-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const { execute, status } = useAction(newPassword, {
    onExecute: () => {
      toast.loading("Resetting password...");
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

  const handleSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    execute({ ...values, token });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="************" type="password" {...field} />
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
          Reset password
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

export default NewPasswordForm;
