import { getPostById } from "@/lib/post";
import Link from "next/link";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { auth } from "@/server/auth";

const PostPreview = async ({
  postId,
  tab,
}: {
  postId: string;
  tab?: "postLikes" | "postBookmarks" | "posts";
}) => {
  const { success: post, error } = await getPostById(postId);
  const session = await auth();

  if (!session) return null;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  if (tab) {
    return (
      <Link href={`/posts?userId=${session.user.id}&tab=${tab}#${post.id}`}>
        <AspectRatio ratio={1}>
          <Image
            src={post.postImages[0].url}
            alt={post.postImages[0].name}
            className="object-cover rounded-sm"
            fill
          />
        </AspectRatio>
      </Link>
    );
  }

  return (
    <Link href={`/posts?userId=${post.userId}#${post.id}`}>
      <AspectRatio ratio={1}>
        <Image
          src={post.postImages[0].url}
          alt={post.postImages[0].name}
          className="object-cover rounded-sm"
          fill
        />
      </AspectRatio>
    </Link>
  );
};

export default PostPreview;
