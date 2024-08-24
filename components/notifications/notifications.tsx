"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useContext, useEffect, useMemo, useState } from "react";
import { FeedStoreState } from "@knocklabs/client";
import { KnockContext } from "./knock-wrapper";
import { knockClient } from "@/lib/knock";
import Notification from "./notification";
import NotificationSkeleton from "./notification-skeleton";

const Notifications = () => {
  const { data: session } = useSession();
  const [knockFeed, setKnockFeed] = useContext(KnockContext);
  const [feed, setFeed] = useState<FeedStoreState>();
  const items = useMemo(() => feed?.items ?? [], [feed]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeed = async () => {
    if (knockFeed) {
      await knockFeed.fetch();

      const feedState = knockFeed.getState();

      setFeed(feedState);
    }
  };

  useEffect(() => {
    if (session) {
      knockClient.authenticate(session.user.id);

      setKnockFeed(
        knockClient.feeds.initialize("d015e1d7-48a8-420d-8f8f-6d43f645137a", {
          page_size: 20,
        })
      );
    }
  }, [session]);

  useEffect(() => {
    if (knockFeed) {
      knockFeed.listenForUpdates();

      fetchFeed();

      setIsLoading(false);

      knockFeed.on("items.received.realtime", () => {
        setFeed(knockFeed.getState());
      });
    }
  }, [knockFeed]);

  return (
    <Card className="border-0 p-0 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle>Your notifications</CardTitle>
        <CardDescription>You have {items.length} notifications</CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1">
        {isLoading ? (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        ) : (
          items.map((item) => (
            <Notification key={item.id} notification={item} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
