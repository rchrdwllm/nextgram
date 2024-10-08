import Nav from "@/components/navigation/nav";
import MobileBottomNav from "@/components/navigation/mobile-bottom-nav";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import DesktopNav from "@/components/navigation/desktop-nav";
import DesktopSuggestions from "@/components/navigation/desktop-suggestions";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <main className="relative h-screen md:flex md:overflow-y-auto">
      <DesktopNav />
      <div className="w-full">
        <Nav />
        <div className="min-h-[90vh] px-4 py-8 md:px-12 lg:px-36">
          {children}
        </div>
      </div>
      <DesktopSuggestions />
      <MobileBottomNav />
    </main>
  );
};

export default Layout;
