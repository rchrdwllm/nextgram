import PostSkeleton from "@/components/post/post-skeleton";

const UserPostsLoading = () => {
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

export default UserPostsLoading;
