import { PostWithDetails } from "@/lib/infer-type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PostImagesCarousel from "./post-images-carousel";
import PostActions from "./post-actions";
import { auth } from "@/server/auth";
import { getPostLikeByIdAndUserId } from "@/lib/like";
import { getBookmarkByIdAndUserId } from "@/lib/bookmark";
import { getPostById } from "@/lib/post";

const Post = async ({ postId }: { postId: string }) => {
  const session = await auth();

  if (!session) return null;

  const likedPost = await getPostLikeByIdAndUserId(postId, session.user.id);
  const isLiked = likedPost ? true : false;

  const bookmarkedPost = await getBookmarkByIdAndUserId(
    postId,
    session.user.id
  );
  const isBookmarked = bookmarkedPost ? true : false;

  const { success: post, error } = await getPostById(postId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <a id={postId}>
      <Card>
        <CardHeader className="flex flex-row gap-4 space-y-0 items-center">
          {post.user!.image ? (
            <Avatar className="h-8 w-8">
              <AvatarImage className="object-cover" src={post.user!.image} />
            </Avatar>
          ) : (
            <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
              <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
                {post.user!.name![0]}
              </p>
            </div>
          )}
          <h1 className="text-sm space-y-0 mt-0 font-medium">
            {post.user!.name}
          </h1>
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
              <span className="text-primary font-medium">
                {post.user!.name}
              </span>{" "}
              {post.caption}
            </p>
          )}
        </CardContent>
      </Card>
    </a>
  );
};

export default Post;
