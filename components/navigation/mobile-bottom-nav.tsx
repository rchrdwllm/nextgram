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

const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="border-t p-4 sticky bottom-0 flex justify-between items-center">
      {navLinks.map((link) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={link.href} key={link.href}>
                <link.Icon
                  className={cn(
                    "h-4 w-4",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                ></link.Icon>
              </Link>
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
