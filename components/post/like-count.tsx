import { PostLike } from "@/lib/infer-type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type LikeCountProps = {
  postLikeCount: number;
  profileCards: ReactNode;
};

const LikeCount = ({ postLikeCount, profileCards }: LikeCountProps) => {
  if (postLikeCount === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm font-medium cursor-pointer">
          {postLikeCount} {postLikeCount === 1 ? "like" : "likes"}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Likes</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1">{profileCards}</div>
      </DialogContent>
    </Dialog>
  );
};

export default LikeCount;
