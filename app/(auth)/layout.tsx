import { ReactNode } from "react";
import Link from "next/link";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) return redirect("/");

  return (
    <div>
      <nav className="flex p-4 border md:px-24 lg:px-48 xl:px-80 2xl:px-96">
        <Link href="/">
          <h1 className="font-bold text-xl">Nextgram</h1>
        </Link>
      </nav>
      <div className="px-4 pt-8 md:px-24 lg:px-48 xl:px-80 2xl:px-96">
        {children}
      </div>
    </div>
  );
};

export default Layout;
