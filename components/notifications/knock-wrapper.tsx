"use client";

import { knockClient } from "@/lib/knock";
import { Feed, FeedItem } from "@knocklabs/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";

export const KnockContext = createContext<
  [Feed | undefined, Dispatch<SetStateAction<Feed | undefined>>]
>([undefined, () => {}]);

const KnockWrapper = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [knockFeed, setKnockFeed] = useState<Feed>();
  const router = useRouter();

  const fetchFeed = async () => {
    if (knockFeed) {
      await knockFeed.fetch();
    }
  };

  useEffect(() => {
    if (session) {
      knockClient.authenticate(session.user.id);

      setKnockFeed(
        knockClient.feeds.initialize("d015e1d7-48a8-420d-8f8f-6d43f645137a")
      );
    }
  }, [session]);

  useEffect(() => {
    if (knockFeed) {
      knockFeed.listenForUpdates();

      fetchFeed();

      knockFeed.on(
        "items.received.realtime",
        ({ items }: { items: FeedItem[] }) => {
          const { data } = items[0];
          const { key } = items[0].source;
          const actor = items[0].actors[0] as any;

          switch (key) {
            case "new-like":
              toast(`${actor.name} liked your post`, {
                action: {
                  label: "Go to post",
                  onClick: () => {
                    router.push(
                      `/posts?userId=${session?.user.id}#${data?.post_id}`
                    );
                  },
                },
              });
              break;
          }
        }
      );
    }
  }, [knockFeed]);

  return (
    <KnockContext.Provider value={[knockFeed, setKnockFeed]}>
      {children}
    </KnockContext.Provider>
  );
};

export default KnockWrapper;
