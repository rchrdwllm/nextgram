"use client";

import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CreateFormButton from "../create/create-form-button";
import { Button } from "../ui/button";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import DesktopUserButton from "./desktop-user-button";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden md:flex flex-col border-r min-h-full px-4 py-8 min-w-[250px]">
      <h1 className="text-xl font-bold">Nextgram</h1>
      <div className="flex flex-col gap-1 mt-8">
        {navLinks.map((link) => (
          <Fragment key={link.href}>
            {link.href ? (
              <Link href={link.href}>
                <Button
                  className={cn(
                    "flex items-center gap-4 w-full justify-start text-left transition-colors",
                    pathname === link.href ? "bg-secondary" : ""
                  )}
                  variant="ghost"
                >
                  <link.Icon
                    className={cn(
                      "h-4 w-4",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={
                      pathname === link.href
                        ? "font-bold text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
                  </span>
                </Button>
              </Link>
            ) : (
              <CreateFormButton asLink />
            )}
          </Fragment>
        ))}
      </div>
      <DesktopUserButton />
    </aside>
  );
};

export default DesktopNav;
