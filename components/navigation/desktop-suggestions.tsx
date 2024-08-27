import { getNotFollowingUsers } from "@/lib/user";
import ProfileCard from "../user/profile-card";
import Footer from "./footer";
import { auth } from "@/server/auth";

const DesktopSuggestions = async () => {
  const { success: users, error } = await getNotFollowingUsers();
  const session = await auth();

  if (!session) {
    return <div>You must be logged in to view this page</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!users) {
    return <div>No users found</div>;
  }

  return (
    <div className="sticky top-0 hidden border-l min-h-screen min-w-[400px] px-4 py-8 md:flex flex-col gap-4">
      <ProfileCard userId={session.user.id} />
      <h1 className="text-xl font-bold">Suggested</h1>
      <div className="flex flex-col gap-1">
        {users.map((userId) => (
          <ProfileCard key={userId} userId={userId} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default DesktopSuggestions;
