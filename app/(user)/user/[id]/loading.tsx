import PostsGrid from "@/components/post/posts-grid";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="flex flex-col gap-2 items-center justify-center">
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-48 h-4" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <PostsGrid>
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
        <Skeleton className="aspect-square w-full rounded-sm" />
      </PostsGrid>
    </div>
  );
};

export default ProfileLoading;
