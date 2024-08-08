import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nextgram",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Toaster
            className={cn(GeistSans.className, "bg-primary")}
            richColors
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
