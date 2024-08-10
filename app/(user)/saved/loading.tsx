import PostsGrid from "@/components/post/posts-grid";
import { Skeleton } from "@/components/ui/skeleton";

const SavedLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
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

export default SavedLoading;
