import { FeedItem } from "@knocklabs/client";
import Image from "next/image";
import Link from "next/link";

const Notification = ({ notification }: { notification: FeedItem }) => {
  if (!notification.data) return null;

  const { updated_at } = notification;
  const actor = notification.actors[0] as any;
  const { post_id, post_img_preview, post_user_id } = notification.data as {
    post_id: string;
    post_img_preview: string;
    post_user_id: string;
  };

  return (
    <Link
      href={`/posts?userId=${post_user_id}#${post_id}`}
      className="flex justify-between items-center rounded-md p-2 transition-colors hover:bg-secondary/50"
    >
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
      {post_img_preview && (
        <div className="relative w-8 h-8">
          <Image
            src={post_img_preview ?? ""}
            alt="post preview"
            className="object-cover w-8 h-8 rounded-sm"
            fill
          />
        </div>
      )}
    </Link>
  );
};

export default Notification;
