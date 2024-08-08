"use client";

import { navLinks } from "@/constants/nav-links";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CreateFormButton from "../create/create-form-button";
import { useEffect, useState } from "react";

const MobileBottomNav = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav
      suppressHydrationWarning
      className="border-t p-4 sticky bottom-0 flex justify-between items-center"
    >
      {navLinks.map((link) => (
        <TooltipProvider key={link.label}>
          <Tooltip>
            <TooltipTrigger>
              {link.href ? (
                <Link href={link.href}>
                  <link.Icon
                    className={cn(
                      "h-4 w-4",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  ></link.Icon>
                </Link>
              ) : (
                <CreateFormButton />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.label.charAt(0).toUpperCase() + link.label.slice(1)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  );
};

export default MobileBottomNav;
