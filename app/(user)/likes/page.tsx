import Likes from "@/components/likes/likes";
import { Suspense } from "react";
import LikesLoading from "./loading";

const LikesPage = () => {
  return (
    <Suspense fallback={<LikesLoading />}>
      <Likes />
    </Suspense>
  );
};

export default LikesPage;
