import Saved from "@/components/saved/saved";
import SavedLoading from "./loading";
import { Suspense } from "react";
import FadeWrapper from "@/components/ui/fade-wrapper";

const SavedPage = () => {
  return (
    <Suspense fallback={<SavedLoading />}>
      <FadeWrapper>
        <Saved />
      </FadeWrapper>
    </Suspense>
  );
};

export default SavedPage;
