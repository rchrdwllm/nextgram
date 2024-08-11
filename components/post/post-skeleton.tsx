import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-4 space-y-0 items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="w-40 h-4" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-1/3 h-4" />
      </CardContent>
    </Card>
  );
};

export default PostSkeleton;
