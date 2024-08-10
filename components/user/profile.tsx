import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserWithPostsLikesBookmarks } from "@/lib/infer-type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPosts from "./user-posts";
import UserLikes from "./user-likes";
import UserBookmarks from "./user-bookmarks";
import { auth } from "@/server/auth";
import { getUserByIdWithPosts } from "@/lib/user";

const Profile = async ({ userId }: { userId: string }) => {
  const session = await auth();
  const isOwner = userId === session?.user.id;

  const { success: user, error } = await getUserByIdWithPosts(userId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {user.image ? (
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image} />
            </Avatar>
          ) : (
            <div className="flex items-center justify-center w-24 h-24 bg-muted rounded-full">
              <p className="text-2xl font-medium transition-colors">
                {user.name![0]}
              </p>
            </div>
          )}
          <div>
            <p className="text-center font-medium">{user.posts.length}</p>
            <p className="text-muted-foreground">posts</p>
          </div>
          <div>
            <p className="text-center font-medium">16</p>
            <p className="text-muted-foreground">followers</p>
          </div>
          <div>
            <p className="text-center font-medium">16</p>
            <p className="text-muted-foreground">following</p>
          </div>
        </div>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>
          {user.bio && <p className="mt-2">{user.bio}</p>}
        </div>
        <Link href="/dashboard/settings">
          <Button variant="secondary" className="w-full">
            Edit profile
          </Button>
        </Link>
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
              <UserPosts posts={user.posts} />
            </TabsContent>
            <TabsContent value="postLikes" className="mt-4">
              <UserLikes postLikes={user.postLikes} />
            </TabsContent>
            <TabsContent value="postBookmarks" className="mt-4">
              <UserBookmarks postBookmarks={user.postBookmarks} />
            </TabsContent>
          </Tabs>
        ) : (
          <UserPosts posts={user.posts} />
        )}
      </header>
    </div>
  );
};

export default Profile;
