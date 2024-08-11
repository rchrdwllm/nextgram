import PostsGrid from "@/components/post/posts-grid";
import { Skeleton } from "../ui/skeleton";

const SearchLoading = () => {
  return (
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
  );
};

export default SearchLoading;
