import FeedPosts from "@/components/post/feed-posts";
import LoadingFeed from "./loading";
import { Suspense } from "react";
import FadeWrapper from "@/components/ui/fade-wrapper";

const FeedPage = () => {
  return (
    <Suspense fallback={<LoadingFeed />}>
      <FadeWrapper>
        <FeedPosts />
      </FadeWrapper>
    </Suspense>
  );
};

export default FeedPage;
