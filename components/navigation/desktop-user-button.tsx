"use client";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Bookmark, Heart, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import ThemeToggler from "./theme-toggler";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

const DesktopUserButton = () => {
  const { data: session } = useSession();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!session) return null;

  const handleLogOut = () => {
    toast.loading("Logging out...");

    setTimeout(async () => {
      await signOut();

      toast.dismiss();
      toast.success("You have been logged out");
    }, 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session.user.image ? (
          <Button
            className="relative mt-auto flex items-center gap-4 w-full justify-start text-left"
            variant="ghost"
          >
            <Avatar className="h-4 w-4">
              <AvatarImage src={session.user.image} className="object-cover" />
              <AvatarFallback>
                <div className="group flex items-center justify-center w-4 h-4 bg-muted rounded-full transition-colors hover:bg-primary">
                  <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
                    {session.user!.name![0]}
                  </p>
                </div>
              </AvatarFallback>
            </Avatar>
            <span className="font-normal overflow-hidden text-ellipsis whitespace-nowrap">
              {session.user.name}
            </span>
          </Button>
        ) : (
          <div className="group flex items-center justify-center w-4 h-4 bg-muted rounded-full transition-colors hover:bg-primary">
            <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
              {session.user.name![0]}
            </p>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-4 min-w-[250px]">
        <div className="group flex flex-col gap-2 items-center justify-center rounded-md w-full py-6 bg-muted">
          {session.user.image ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user.image} className="object-cover" />
              <AvatarFallback>
                <p className="font-medium">{session.user.name![0]}</p>
              </AvatarFallback>
            </Avatar>
          ) : (
            <p className="font-medium">{session.user.name![0]}</p>
          )}
          <p className="text-xs font-medium">{session.user.name}</p>
          <p className="text-xs">{session.user.email}</p>
        </div>
        <DropdownMenuSeparator className="my-4" />
        <Link href={`/user/${session.user.id}`}>
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        {!isDesktop && (
          <>
            <Link href="/likes">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Heart className="w-4 h-4" />
                <span>Likes</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/saved">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Bookmark className="w-4 h-4" />
                <span>Saved</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <DropdownMenuItem className="cursor-pointer">
          <ThemeToggler />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 cursor-pointer"
          onClick={handleLogOut}
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopUserButton;
