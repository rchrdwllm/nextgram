import { PostLike } from "@/lib/infer-type";

const LikeCount = ({ postLikes }: { postLikes: PostLike[] }) => {
  if (!postLikes || !postLikes.length) return null;

  return (
    <p className="text-sm font-medium">
      {postLikes.length} {postLikes.length === 1 ? "like" : "likes"}
    </p>
  );
};

export default LikeCount;
