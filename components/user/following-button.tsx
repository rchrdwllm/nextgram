import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileCard from "./profile-card";

const FollowingButton = ({
  userFollowingIds,
}: {
  userFollowingIds: string[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <p className="text-center font-medium">{userFollowingIds.length}</p>
          <p className="text-muted-foreground">following</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Following</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex flex-col gap-4">
          {userFollowingIds.map((followingId) => (
            <ProfileCard key={followingId} userId={followingId} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowingButton;
