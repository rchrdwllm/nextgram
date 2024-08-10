import Profile from "@/components/user/profile";
import { Suspense } from "react";
import ProfileLoading from "./loading";

const UserPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <Profile userId={id} />
    </Suspense>
  );
};

export default UserPage;
