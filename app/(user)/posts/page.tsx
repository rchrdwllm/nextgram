import UserPosts from "@/components/post/user-posts";
import { Suspense } from "react";
import UserPostsLoading from "./loading";

const UserPostsPage = async ({
  searchParams: { userId, tab },
}: {
  searchParams: {
    userId: string;
    tab: "postLikes" | "postBookmarks" | "posts";
  };
}) => {
  return (
    <Suspense fallback={<UserPostsLoading />}>
      <UserPosts userId={userId} tab={tab} />
    </Suspense>
  );
};

export default UserPostsPage;
