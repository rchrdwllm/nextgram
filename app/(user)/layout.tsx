import Nav from "@/components/navigation/nav";
import MobileBottomNav from "@/components/navigation/mobile-bottom-nav";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <main className="h-screen">
      <Nav />
      <div className="h-full px-4 py-8">{children}</div>
      <MobileBottomNav />
    </main>
  );
};

export default Layout;
