"use client";

import { Toggle } from "../ui/toggle";
import { MessageCircle } from "lucide-react";

const ReplyButton = () => {
  return (
    <Toggle>
      <MessageCircle className="w-4 h-4" />
    </Toggle>
  );
};

export default ReplyButton;
