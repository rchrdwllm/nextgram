"use client";

import { Button } from "../ui/button";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateForm from "../create/create-form";
import { PostWithDetails } from "@/lib/infer-type";

const MoreActions = ({ post }: { post: PostWithDetails }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="px-3 text-muted-foreground hover:text-primary"
          >
            <EllipsisVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <SquarePen className="w-4 h-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="flex gap-2 cursor-pointer group hover:bg-destructive">
            <Trash2 className="w-4 h-4 transition-colors group-hover:text-destructive-foreground" />
            <span className="transition-colors group-hover:text-destructive-foreground">
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription>
            Create a post to share your thoughts, ideas, or interesting links.
          </DialogDescription>
        </DialogHeader>
        <CreateForm post={post} onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default MoreActions;
