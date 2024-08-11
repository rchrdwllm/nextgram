import { getUsersByQuery } from "@/lib/user";
import ProfileCard from "../user/profile-card";

const SearchUsers = async ({ query }: { query: string }) => {
  const { success: searchUsers, error } = query
    ? await getUsersByQuery(query)
    : {
        success: [],
        error: null,
      };

  if (error) return <div>{error}</div>;

  if (!searchUsers) return <div>No posts found</div>;

  return (
    <div className="flex flex-col gap-4 mt-4">
      {searchUsers.map((userId) => (
        <ProfileCard key={userId} userId={userId} />
      ))}
    </div>
  );
};

export default SearchUsers;
