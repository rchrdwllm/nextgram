"use client";

import { Button } from "../ui/button";
import { Share } from "lucide-react";

const ShareButton = () => {
  return (
    <Button variant="ghost" className="px-3">
      <Share className="w-4 h-4" />
    </Button>
  );
};

export default ShareButton;
