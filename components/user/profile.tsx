import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserWithPosts } from "@/lib/infer-type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPosts from "./user-posts";

const Profile = ({ user }: { user: UserWithPosts }) => {
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
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger className="w-full" value="likes">
              Likes
            </TabsTrigger>
            <TabsTrigger className="w-full" value="bookmarks">
              Saved
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-4">
            <UserPosts posts={user.posts} />
          </TabsContent>
        </Tabs>
      </header>
    </div>
  );
};

export default Profile;
