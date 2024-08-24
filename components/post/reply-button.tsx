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
import ReplyForm from "../reply/reply-form";
import { ReactNode } from "react";

type ReplyButtonProps = {
  children: ReactNode;
  postId: string;
};

const ReplyButton = ({ children, postId }: ReplyButtonProps) => {
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
