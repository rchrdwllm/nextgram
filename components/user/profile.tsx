import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "@/lib/infer-type";

const Profile = ({ user }: { user: User }) => {
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
            <p className="text-center font-medium">16</p>
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
        {/* tabs for posts, bookmarks, and likes */}
      </header>
    </div>
  );
};

export default Profile;
