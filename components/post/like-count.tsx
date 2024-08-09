const LikeCount = ({ postLikes }: { postLikes: number }) => {
  if (postLikes === 0) return null;

  return (
    <p className="text-sm font-medium">
      {postLikes} {postLikes === 1 ? "like" : "likes"}
    </p>
  );
};

export default LikeCount;
