"use client";

import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  const { theme } = useTheme();

  return (
    <NextTopLoader
      color={theme === "light" ? "#030712" : "#f9fafb"}
      showSpinner={false}
    />
  );
};

export default TopLoader;
