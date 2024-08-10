import Saved from "@/components/saved/saved";
import SavedLoading from "./loading";
import { Suspense } from "react";

const SavedPage = () => {
  return (
    <Suspense fallback={<SavedLoading />}>
      <Saved />
    </Suspense>
  );
};

export default SavedPage;
