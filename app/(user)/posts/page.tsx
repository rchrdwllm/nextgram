import UserPosts from "@/components/post/user-posts";
import { Suspense } from "react";
import UserPostsLoading from "./loading";
import FadeWrapper from "@/components/ui/fade-wrapper";

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
      <FadeWrapper>
        <UserPosts userId={userId} tab={tab} />
      </FadeWrapper>
    </Suspense>
  );
};

export default UserPostsPage;
