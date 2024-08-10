import Profile from "@/components/user/profile";
import { Suspense } from "react";
import ProfileLoading from "./loading";
import FadeWrapper from "@/components/ui/fade-wrapper";

const UserPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <FadeWrapper>
        <Profile userId={id} />
      </FadeWrapper>
    </Suspense>
  );
};

export default UserPage;
