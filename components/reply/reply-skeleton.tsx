import { Skeleton } from "../ui/skeleton";

const ReplySkeleton = () => {
  return (
    <article className="mb-2 flex gap-3 items-start">
      <div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2 items-center text-xs text-muted-foreground">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
      <Skeleton className="h-4 w-4"></Skeleton>
    </article>
  );
};

export default ReplySkeleton;
