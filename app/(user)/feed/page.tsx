import Posts from "@/components/post/posts";
import LoadingFeed from "./loading";
import { Suspense } from "react";

const FeedPage = () => {
  return (
    <Suspense fallback={<LoadingFeed />}>
      <Posts />
    </Suspense>
  );
};

export default FeedPage;
