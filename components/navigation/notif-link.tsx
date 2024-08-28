"use client";

import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useNotifStore } from "@/zustand/notif-store";
import { useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

const NotifLink = () => {
  const pathname = usePathname();
  const { notifications } = useNotifStore();
  const controls = useAnimation();

  const shakeAnimation = {
    x: [0, -4, 4, -4, 4, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  useEffect(() => {
    if (notifications) {
      controls.start(shakeAnimation);
    }
  }, [notifications]);

  return (
    <Link href="/notifications">
      <Button
        className={cn(
          "flex items-center gap-4 w-full justify-between transition-colors",
          pathname === "/notifications" ? "bg-secondary" : ""
        )}
        variant="ghost"
      >
        <div className="flex items-center gap-4 text-left">
          <motion.div animate={controls}>
            <Bell
              className={cn(
                "h-4 w-4",
                pathname === "/notifications"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
          </motion.div>
          <span
            className={
              pathname === "/notifications"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Notifications
          </span>
        </div>
        <AnimatePresence>
          {notifications ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Badge variant="secondary">{notifications}</Badge>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Button>
    </Link>
  );
};

export default NotifLink;
