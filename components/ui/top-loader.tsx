"use client";

import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";

const TopLoader = () => {
  const { theme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <NextTopLoader
      color={theme === "light" ? "#030712" : "#f9fafb"}
      showSpinner={false}
    />
  );
};

export default TopLoader;
