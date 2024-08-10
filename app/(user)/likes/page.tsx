import Likes from "@/components/likes/likes";
import { Suspense } from "react";
import LikesLoading from "./loading";
import FadeWrapper from "@/components/ui/fade-wrapper";

const LikesPage = () => {
  return (
    <Suspense fallback={<LikesLoading />}>
      <FadeWrapper>
        <Likes />
      </FadeWrapper>
    </Suspense>
  );
};

export default LikesPage;
