"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Providers = () => {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => signIn("github")}
        className="w-full flex items-center gap-2"
        variant="outline"
      >
        <FaGithub />
        <span>Github</span>
      </Button>
      <Button
        onClick={() => signIn("google")}
        className="w-full flex items-center gap-2"
        variant="outline"
      >
        <FcGoogle />
        <span>Google</span>
      </Button>
    </div>
  );
};

export default Providers;
