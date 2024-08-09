"use client";

import { Toggle } from "../ui/toggle";
import { Share } from "lucide-react";

const ShareButton = () => {
  return (
    <Toggle>
      <Share className="w-4 h-4" />
    </Toggle>
  );
};

export default ShareButton;
