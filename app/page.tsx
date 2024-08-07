import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  if (session) return redirect("/feed");

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-3xl">Welcome to Nextgram!</h1>
      <p className="text-muted-foreground text-center">
        An attempt to clone Instagram's basic functionalities using Next.js,
        TypeScript, Framer Motion, Zustand, Drizzle, and NeonDB.
      </p>
      <div className="w-64 flex gap-4">
        <Link className="w-full" href="/register">
          <Button variant="secondary" className="w-full">
            Register
          </Button>
        </Link>
        <Link className="w-full" href="/login">
          <Button className="w-full">Log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
