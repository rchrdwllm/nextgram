import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CreateFormButton from "../create/create-form-button";
import { Button } from "../ui/button";

const DesktopNav = () => {
  return (
    <aside className="border-r min-h-full p-4 min-w-[250px]">
      <h1 className="text-xl font-bold">Nextgram</h1>
      <div className="flex flex-col gap-1 mt-8">
        {navLinks.map((link) => (
          <>
            {link.href ? (
              <Link href={link.href}>
                <Button
                  className="flex items-center gap-4 w-full justify-start text-left"
                  variant="ghost"
                >
                  <link.Icon
                    className={cn(
                      "h-4 w-4"
                      // pathname === link.href
                      //   ? "text-primary"
                      //   : "text-muted-foreground"
                    )}
                  />
                  <span>
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
                  </span>
                </Button>
              </Link>
            ) : (
              <Button
                className="flex items-center gap-4 w-full justify-start text-left"
                variant="ghost"
              >
                <CreateFormButton />
                <span>
                  {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
                </span>
              </Button>
            )}
          </>
        ))}
      </div>
    </aside>
  );
};

export default DesktopNav;
