"use client";

import { PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateForm from "./create-form";
import { useState } from "react";
import { Button } from "../ui/button";

const CreateFormButton = ({ asLink }: { asLink?: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asLink ? (
          <Button
            className="flex items-center gap-4 w-full justify-start text-left"
            variant="ghost"
          >
            <PlusSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground font-normal">Create</span>
          </Button>
        ) : (
          <PlusSquare className="h-4 w-4 text-muted-foreground" />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription>
            Create a post to share your thoughts, ideas, or interesting links.
          </DialogDescription>
        </DialogHeader>
        <CreateForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;
