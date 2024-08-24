"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { deleteReply } from "@/server/actions/delete-reply";

type DeleteReplyButtonProps = {
  replyId: number;
};

const DeleteReplyButton = ({ replyId }: DeleteReplyButtonProps) => {
  const { execute, status } = useAction(deleteReply, {
    onExecute: () => {
      toast.loading("Deleting reply...");
    },
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
  });

  const handleDelete = () => {
    execute({ replyId });
  };

  return (
    <Button
      className={cn(
        status === "executing" ? "animate-pulse pointer-events-none" : ""
      )}
      variant="destructive"
      onClick={handleDelete}
    >
      Delete reply
    </Button>
  );
};

export default DeleteReplyButton;
