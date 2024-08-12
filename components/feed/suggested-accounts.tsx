import { getUsersByLimit } from "@/lib/user";
import ProfileCard from "../user/profile-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SuggestedAccounts = async () => {
  const { success: users, error } = await getUsersByLimit(5);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!users) {
    return <div>No users found</div>;
  }

  return (
    <div className="w-full h-full justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Suggested accounts</CardTitle>
          <CardDescription>
            Not seeing posts? Try following some accounts, or create a post!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {users.map((userId) => (
            <ProfileCard key={userId} userId={userId} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestedAccounts;
