"use client";

import { Toggle } from "../ui/toggle";
import { Bookmark } from "lucide-react";

const BookmarkButton = () => {
  return (
    <Toggle>
      <Bookmark className="w-4 h-4" />
    </Toggle>
  );
};

export default BookmarkButton;
