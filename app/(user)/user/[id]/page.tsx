import { getUserById } from "@/lib/user";
import Profile from "@/components/user/profile";
import { auth } from "@/server/auth";

const UserPage = async ({ params: { id } }: { params: { id: string } }) => {
  const { success: user, error } = await getUserById(id);
  const session = await auth();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return <Profile user={user} />;
};

export default UserPage;
