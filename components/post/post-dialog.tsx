import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostWithDetails } from "@/lib/infer-type";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Post from "./post";
import { getUserById } from "@/lib/user";

const PostDialog = async ({ post }: { post: PostWithDetails }) => {
  const { success: postUser, error } = await getUserById(post.userId!);

  if (error) return <div>User not found</div>;

  if (!postUser) return <div>User not found</div>;

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <AspectRatio ratio={1}>
          <Image
            src={post.postImages[0].url}
            alt={post.postImages[0].name}
            className="object-cover rounded-sm"
            fill
          />
        </AspectRatio>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{postUser.name}'s post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Post postId={post.id} />
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
