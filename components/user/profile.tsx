import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPosts from "./user-posts";
import UserLikes from "./user-likes";
import UserBookmarks from "./user-bookmarks";
import { auth } from "@/server/auth";
import { getUserById } from "@/lib/user";
import { getUserPostIds } from "@/lib/post";
import { getUserLikes } from "@/lib/like";
import { getUserBookmarks } from "@/lib/bookmark";
import FollowButton from "./follow-button";
import { getUserFollowerIds, getUserFollowingIds } from "@/lib/follow";
import FollowingButton from "./following-button";
import FollowersButton from "./followers-button";

const Profile = async ({ userId }: { userId: string }) => {
  const session = await auth();
  const isOwner = userId === session?.user.id;

  const { success: user, error } = await getUserById(userId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const { success: userPostIds, error: userPostIdsError } =
    await getUserPostIds(userId);

  if (userPostIdsError) {
    return <div>Error: {userPostIdsError}</div>;
  }

  if (!userPostIds) {
    return <div>User posts not found</div>;
  }

  const { success: userLikes, error: userLikesError } = await getUserLikes(
    userId
  );

  if (userLikesError) {
    return <div>Error: {userLikesError}</div>;
  }

  if (!userLikes) {
    return <div>User likes not found</div>;
  }

  const userLikeIds = userLikes.map((like) => like.postId);

  const { success: userBookmarks, error: userBookmarksError } =
    await getUserBookmarks(userId);

  if (userBookmarksError) {
    return <div>Error: {userBookmarksError}</div>;
  }

  if (!userBookmarks) {
    return <div>User bookmarks not found</div>;
  }

  const userBookmarkIds = userBookmarks.map((bookmark) => bookmark.postId);

  const { success: userFollowerIds, error: userFollowerIdsError } =
    await getUserFollowerIds(userId);
  const { success: userFollowingIds, error: userFollowingIdsError } =
    await getUserFollowingIds(userId);

  if (userFollowerIdsError) {
    return <div>Error: {userFollowerIdsError}</div>;
  }

  if (!userFollowerIds) {
    return <div>User follower ids not found</div>;
  }

  if (userFollowingIdsError) {
    return <div>Error: {userFollowingIdsError}</div>;
  }

  if (!userFollowingIds) {
    return <div>User following ids not found</div>;
  }

  const isFollowing = userFollowerIds.includes(session?.user.id!);

  return (
    <div>
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {user.image ? (
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image} className="object-cover" />
              <AvatarFallback>
                <div className="flex items-center justify-center w-24 h-24 bg-muted rounded-full">
                  <p className="text-2xl font-medium transition-colors">
                    {user.name![0]}
                  </p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center justify-center w-24 h-24 bg-muted rounded-full">
              <p className="text-2xl font-medium transition-colors">
                {user.name![0]}
              </p>
            </div>
          )}
          <div>
            <p className="text-center font-medium">{userPostIds.length}</p>
            <p className="text-muted-foreground">posts</p>
          </div>
          <FollowersButton userFollowerIds={userFollowerIds} />
          <FollowingButton userFollowingIds={userFollowingIds} />
        </div>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>
          {user.bio && <p className="mt-2">{user.bio}</p>}
        </div>
        {isOwner ? (
          <Link href="/settings">
            <Button variant="secondary" className="w-full">
              Edit profile
            </Button>
          </Link>
        ) : (
          <FollowButton
            followerId={session?.user.id!}
            followingId={userId}
            isDefaultFollowing={isFollowing}
          />
        )}
        {isOwner ? (
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="posts">
                Posts
              </TabsTrigger>
              <TabsTrigger className="w-full" value="postLikes">
                Likes
              </TabsTrigger>
              <TabsTrigger className="w-full" value="postBookmarks">
                Saved
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-4">
              <UserPosts postIds={userPostIds} />
            </TabsContent>
            <TabsContent value="postLikes" className="mt-4">
              <UserLikes postIds={userLikeIds} />
            </TabsContent>
            <TabsContent value="postBookmarks" className="mt-4">
              <UserBookmarks postIds={userBookmarkIds} />
            </TabsContent>
          </Tabs>
        ) : (
          <UserPosts postIds={userPostIds} />
        )}
      </header>
    </div>
  );
};

export default Profile;
