"use client";

import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReplyForm from "../reply/reply-form";
import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

type ReplyButtonProps = {
  children: ReactNode;
  postId: string;
};

const ReplyButton = ({ children, postId }: ReplyButtonProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="px-3">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Replies</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="p-4 flex flex-col gap-4">
            {children}
            <ReplyForm postId={postId} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="px-3">
          <MessageCircle className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Replies</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription></DrawerDescription>
          <div className="p-4 flex flex-col gap-4">
            {children}
            <ReplyForm postId={postId} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReplyButton;
