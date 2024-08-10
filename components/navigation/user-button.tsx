"use client";

import { Bookmark, Heart, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserType } from "next-auth";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import ThemeToggler from "./theme-toggler";
import Link from "next/link";

const UserButton = ({ user }: { user: UserType }) => {
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
      <DropdownMenuTrigger>
        {user.image ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
                  {user.name![0]}
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
            <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
              {user.name![0]}
            </p>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 min-w-[250px]">
        <div className="group flex flex-col gap-2 items-center justify-center rounded-md w-full py-6 bg-muted">
          {user.image ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} />
            </Avatar>
          ) : (
            <p className="font-medium">{user.name![0]}</p>
          )}
          <p className="text-xs font-medium">{user.name}</p>
          <p className="text-xs">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="my-4" />
        <Link href={`/user/${user.id}`}>
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/likes">
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <Heart className="w-4 h-4" />
            <span>Likes</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/bookmarks">
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

export default UserButton;
