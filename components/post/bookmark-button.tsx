"use client";

import { useAction } from "next-safe-action/hooks";
import { Toggle } from "../ui/toggle";
import { Bookmark } from "lucide-react";
import { bookmarkPost } from "@/server/actions/bookmark-post";

type BookmarkButtonProps = {
  postId: string;
  isBookmarked: boolean;
};

const BookmarkButton = ({ postId, isBookmarked }: BookmarkButtonProps) => {
  const { execute } = useAction(bookmarkPost);

  const handleBookmark = () => {
    execute({ postId });
  };

  return (
    <Toggle defaultPressed={isBookmarked} onPressedChange={handleBookmark}>
      <Bookmark className="w-4 h-4" />
    </Toggle>
  );
};

export default BookmarkButton;
