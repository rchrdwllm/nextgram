import { getUsersByLimit } from "@/lib/user";
import ProfileCard from "../user/profile-card";
import Footer from "./footer";

const DesktopSuggestions = async () => {
  const { success: users, error } = await getUsersByLimit(5);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!users) {
    return <div>No users found</div>;
  }

  return (
    <div className="hidden border-l min-h-screen min-w-[400px] px-4 py-8 md:flex flex-col gap-4">
      <h1 className="text-xl font-bold">Suggested</h1>
      {users.map((userId) => (
        <ProfileCard key={userId} userId={userId} />
      ))}
      <Footer />
    </div>
  );
};

export default DesktopSuggestions;
