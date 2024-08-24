import { FeedItem } from "@knocklabs/client";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "../user/follow-button";

const Notification = ({ notification }: { notification: FeedItem }) => {
  if (!notification.data) return null;

  const { updated_at } = notification;
  const actor = notification.actors[0] as any;
  const { key } = notification.source;
  const { data } = notification;

  switch (key) {
    case "new-like":
      return (
        <Link
          href={`/posts?userId=${data.post_user_id}#${data.post_id}`}
          className="flex gap-4 items-center rounded-md p-2 transition-colors hover:bg-secondary/50"
        >
          <div className="relative w-8 h-8">
            <Image
              src={data.liker_image ?? ""}
              alt="post preview"
              className="object-cover w-8 h-8 rounded-sm"
              fill
            />
          </div>
          <div className="flex-1">
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
              src={data.post_img_preview ?? ""}
              alt="post preview"
              className="object-cover w-8 h-8 rounded-sm"
              fill
            />
          </div>
        </Link>
      );
    case "new-follow":
      return (
        <Link
          href={`/user/${data.follower_id}`}
          className="flex gap-3 items-center rounded-md p-2 transition-colors hover:bg-secondary/50"
        >
          {data.follower_img && (
            <div className="relative w-8 h-8">
              <Image
                src={data.follower_img ?? ""}
                alt="follower preview"
                className="object-cover w-8 h-8 rounded-sm"
                fill
              />
            </div>
          )}
          <div className="flex-1">
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
    case "new-reply":
      return (
        <Link
          href={`/posts?userId=${data.replier_id}#${data.post_id}`}
          className="flex gap-4 items-center rounded-md p-2 transition-colors hover:bg-secondary/50"
        >
          <div className="relative w-8 h-8">
            <Image
              src={data.replier_img ?? ""}
              alt="post preview"
              className="object-cover w-8 h-8 rounded-sm"
              fill
            />
          </div>
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">{actor.name}</span> replied to your
              post: {data.content}
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
              src={data.post_img_preview ?? ""}
              alt="post preview"
              className="object-cover w-8 h-8 rounded-sm"
              fill
            />
          </div>
        </Link>
      );
  }
};

export default Notification;
