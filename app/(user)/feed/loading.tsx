import PostSkeleton from "@/components/post/post-skeleton";

const LoadingFeed = () => {
  return (
    <div className="flex flex-col gap-4">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export default LoadingFeed;
