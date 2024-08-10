import FeedPosts from "@/components/post/feed-posts";
import LoadingFeed from "./loading";
import { Suspense } from "react";

const FeedPage = () => {
  return (
    <Suspense fallback={<LoadingFeed />}>
      <FeedPosts />
    </Suspense>
  );
};

export default FeedPage;
