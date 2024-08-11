import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostImagesCarousel from "./post-images-carousel";
import PostActions from "./post-actions";
import { auth } from "@/server/auth";
import { getPostLikeByIdAndUserId } from "@/lib/like";
import { getBookmarkByIdAndUserId } from "@/lib/bookmark";
import { getPostById } from "@/lib/post";
import { getUserById } from "@/lib/user";
import Link from "next/link";
import MoreActions from "./more-actions";

const Post = async ({ postId }: { postId: string }) => {
  const session = await auth();

  if (!session) return null;

  const { success: post, error: postError } = await getPostById(postId);

  if (postError) return <div>Error: {postError}</div>;

  if (!post) return <div>Post not found</div>;

  const { success: postUser, error: postUserError } = await getUserById(
    post.userId!
  );

  if (postUserError) return <div>Error: {postUserError}</div>;

  if (!postUser) return <div>User not found</div>;

  const likedPost = await getPostLikeByIdAndUserId(post.id, session.user.id);
  const isLiked = likedPost ? true : false;

  const bookmarkedPost = await getBookmarkByIdAndUserId(
    post.id,
    session.user.id
  );
  const isBookmarked = bookmarkedPost ? true : false;

  const isOwner = post.userId === session.user.id;

  return (
    <div id={post.id}>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0">
          <Link
            className="flex flex-row gap-4 space-y-0 items-center"
            href={`/user/${post.userId}`}
          >
            {postUser.image ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={postUser.image} className="object-cover" />
                <AvatarFallback>
                  <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
                    <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
                      {postUser.name![0]}
                    </p>
                  </div>
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
                  {postUser.name![0]}
                </p>
              </div>
            )}
            <h1 className="text-sm space-y-0 mt-0 font-medium">
              {postUser.name}
            </h1>
          </Link>
          {isOwner && <MoreActions post={post} />}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <PostImagesCarousel postImages={post.postImages} />
          <PostActions
            post={post}
            isLiked={isLiked}
            isBookmarked={isBookmarked}
          />
          {post.caption && (
            <p className="text-muted-foreground text-sm">
              <span className="text-primary font-medium">{postUser.name}</span>{" "}
              {post.caption}
            </p>
          )}
          <span className="text-muted-foreground text-sm">
            {new Date(post.createdAt!).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
