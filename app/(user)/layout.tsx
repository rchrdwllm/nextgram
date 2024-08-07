import Nav from "@/components/navigation/nav";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <main>
      <Nav />
      {children}
    </main>
  );
};

export default Layout;
