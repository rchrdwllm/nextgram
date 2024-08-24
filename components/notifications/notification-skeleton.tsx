import { Skeleton } from "../ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
    </div>
  );
};

export default NotificationSkeleton;
