import { getUserById } from "@/lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import FollowButton from "./follow-button";
import { auth } from "@/server/auth";
import { getUserFollowerIds } from "@/lib/follow";

const ProfileCard = async ({ userId }: { userId: string }) => {
  const { success: user, error } = await getUserById(userId);
  const session = await auth();

  if (!session) return <div>You need to be logged in to follow users</div>;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const { success: userFollowerIds, error: userFollowerIdsError } =
    await getUserFollowerIds(userId);

  if (userFollowerIdsError) {
    return <div>Error: {userFollowerIdsError}</div>;
  }

  if (!userFollowerIds) {
    return <div>User follower ids not found</div>;
  }

  const isFollowing = userFollowerIds.includes(session?.user.id!);

  return (
    <Link
      href={`/user/${userId}`}
      className="flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        {user.image ? (
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image} className="object-cover" />
            <AvatarFallback>
              <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full">
                <p className="text-sm font-medium">{user.name![0]}</p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full">
            <p className="text-sm font-medium">{user.name![0]}</p>
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      {userId !== session.user.id && (
        <FollowButton
          followerId={session.user.id}
          followingId={userId}
          isDefaultFollowing={isFollowing}
        />
      )}
    </Link>
  );
};

export default ProfileCard;
