import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileCard from "./profile-card";

const FollowersButton = ({
  userFollowerIds,
}: {
  userFollowerIds: string[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <p className="text-center font-medium">{userFollowerIds.length}</p>
          <p className="text-muted-foreground">
            {userFollowerIds.length === 1 ? "follower" : "followers"}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Followers</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You have {userFollowerIds.length} people following you
        </DialogDescription>
        <div className="flex flex-col gap-4 mt-4">
          {userFollowerIds.map((followerId) => (
            <ProfileCard key={followerId} userId={followerId} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersButton;
