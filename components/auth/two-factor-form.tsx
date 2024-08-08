"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { twoFactorSchema } from "@/form_schemas/two-factor-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAction } from "next-safe-action/hooks";
import { twoFactorLogin } from "@/server/actions/two-factor-login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TwoFactorForm = () => {
  const form = useForm<z.infer<typeof twoFactorSchema>>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });
  const router = useRouter();
  const { execute, status } = useAction(twoFactorLogin, {
    onExecute: () => {
      toast.loading("Verifying...");
    },
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);

        router.push("/feed");
      }

      if (data?.error) {
        toast.dismiss();
        toast.error(data.error);
      }
    },
  });

  const handleSubmit = (values: z.infer<typeof twoFactorSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="w-full flex justify-center">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit code</Button>
      </form>
    </Form>
  );
};

export default TwoFactorForm;
