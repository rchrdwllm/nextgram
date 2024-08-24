"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { replySchema } from "@/form_schemas/reply-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { reply as replyAction } from "@/server/actions/reply";
import { cn } from "@/lib/utils";
import { PostReply } from "@/lib/infer-type";
import { useEffect } from "react";

type ReplyFormProps = {
  postId?: string;
  reply?: PostReply;
};

const ReplyForm = ({ postId, reply }: ReplyFormProps) => {
  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: "",
      postId: postId ?? undefined,
      replyId: reply?.id ?? undefined,
    },
  });
  const { execute, status } = useAction(replyAction, {
    onExecute: () => {
      toast.loading(reply ? "Updating reply..." : "Creating reply...");
    },
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data?.success);
        form.reset();
      }

      if (data?.error) {
        toast.dismiss();
        toast.error(data.error);
      }
    },
  });

  useEffect(() => {
    if (reply) {
      form.setValue("content", reply.content ?? "");
    }
  }, [reply]);

  const handleSubmit = (values: z.infer<typeof replySchema>) => {
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Write your reply" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={cn(
            "w-full",
            status === "executing" ? "animate-pulse pointer-events-none" : ""
          )}
        >
          {reply ? "Update reply" : "Reply"}
        </Button>
      </form>
    </Form>
  );
};

export default ReplyForm;
