import { FeedItem } from "@knocklabs/client";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "../user/follow-button";

const Notification = ({ notification }: { notification: FeedItem }) => {
  if (!notification.data) return null;

  const { updated_at } = notification;
  const actor = notification.actors[0] as any;
  const { key } = notification.source;

  switch (key) {
    case "new-like":
      const { post_id, post_img_preview, post_user_id, liker_image } =
        notification.data as {
          post_id: string;
          post_img_preview: string;
          post_user_id: string;
          liker_image: string;
        };

      return (
        <Link
          href={`/posts?userId=${post_user_id}#${post_id}`}
          className="flex gap-4 items-center rounded-md p-2 transition-colors hover:bg-secondary/50"
        >
          <div className="relative w-8 h-8">
            <Image
              src={liker_image ?? ""}
              alt="post preview"
              className="object-cover w-8 h-8 rounded-sm"
              fill
            />
          </div>
          <div>
            <p className="text-sm">
              <span className="font-medium">{actor.name}</span> liked your post
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(updated_at).toLocaleDateString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
          <div className="relative w-8 h-8">
            <Image
              src={post_img_preview ?? ""}
              alt="post preview"
              className="object-cover w-8 h-8 rounded-sm"
              fill
            />
          </div>
        </Link>
      );
    case "new-follow":
      const { follower_id, follower_img } = notification.data as {
        follower_id: string;
        follower_img: string;
      };

      return (
        <Link
          href={`/user/${follower_id}`}
          className="flex gap-3 items-center rounded-md p-2 transition-colors hover:bg-secondary/50"
        >
          {follower_img && (
            <div className="relative w-8 h-8">
              <Image
                src={follower_img ?? ""}
                alt="follower preview"
                className="object-cover w-8 h-8 rounded-sm"
                fill
              />
            </div>
          )}
          <div>
            <p className="text-sm">
              <span className="font-medium">{actor.name}</span> followed you
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(updated_at).toLocaleDateString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </Link>
      );
  }
};

export default Notification;
