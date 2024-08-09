"use client";

import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

const ReplyButton = () => {
  return (
    <Button variant="ghost" className="px-3">
      <MessageCircle className="w-4 h-4" />
    </Button>
  );
};

export default ReplyButton;
