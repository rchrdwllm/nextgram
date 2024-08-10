"use client";

import { ReactNode, useState, useEffect } from "react";

const UserPostsLinkScroller = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      const hash = window.location.hash;

      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "instant" });
        }
      }
    }
  }, [isReady]);

  return <>{children}</>;
};

export default UserPostsLinkScroller;
