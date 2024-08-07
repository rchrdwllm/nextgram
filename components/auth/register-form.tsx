"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema } from "@/form_schemas/register-schema";
import { emailRegister } from "@/server/actions/email-register";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { execute, status } = useAction(emailRegister, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      }

      if (data?.error) {
        toast.dismiss();
        toast.error(data.error);
      }
    },
    onExecute: () => {
      toast.loading("Registering...");
    },
  });

  const handleSubmit = (values: z.infer<typeof registerSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="************" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/login">
          <Button
            variant="link"
            className="p-0 text-muted-foreground transition-colors hover:text-primary"
          >
            Already have an account? Log in here
          </Button>
        </Link>
        <Button
          type="submit"
          className={cn(
            "w-full",
            status === "executing" ? "animate-pulse pointer-events-none" : ""
          )}
        >
          Create account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
