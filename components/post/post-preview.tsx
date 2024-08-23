import { getPostById } from "@/lib/post";
import Link from "next/link";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { auth } from "@/server/auth";
import PostDialog from "./post-dialog";

type PostPreviewProps = {
  postId: string;
  tab?: "postLikes" | "postBookmarks" | "posts";
  fromSearch?: boolean;
};

const PostPreview = async ({ postId, tab, fromSearch }: PostPreviewProps) => {
  const { success: post, error } = await getPostById(postId);
  const session = await auth();

  if (!session) return null;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  if (fromSearch) {
    return <PostDialog post={post} />;
  }

  const href = tab
    ? `/posts?userId=${post.userId}&tab=${tab}#${post.id}`
    : `/posts?userId=${post.userId}#${post.id}`;

  return (
    <Link href={href}>
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
