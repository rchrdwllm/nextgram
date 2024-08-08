import Link from "next/link";
import UserButton from "./user-button";
import { auth } from "@/server/auth";

const Nav = async () => {
  const session = await auth();

  return (
    <nav className="flex p-4 border-b justify-between items-center">
      <Link href="/feed">
        <h1 className="text-xl font-bold">Nextgram</h1>
      </Link>
      <UserButton user={session!.user!} />
    </nav>
  );
};

export default Nav;
