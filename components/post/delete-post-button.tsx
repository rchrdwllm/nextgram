import { useAction } from "next-safe-action/hooks";
import { Button } from "../ui/button";
import { deletePost } from "@/server/actions/delete-post";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DeletePostButton = ({ postId }: { postId: string }) => {
  const { execute, status } = useAction(deletePost, {
    onExecute: () => {
      toast.loading("Deleting post...");
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
    execute({ postId });
  };

  return (
    <Button
      className={cn(
        status === "executing" ? "animate-pulse pointer-events-none" : ""
      )}
      variant="destructive"
      onClick={handleDelete}
    >
      Delete post
    </Button>
  );
};

export default DeletePostButton;
