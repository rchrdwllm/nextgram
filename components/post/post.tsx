import { PostWithDetails } from "@/lib/infer-type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PostImagesCarousel from "./post-images-carousel";
import PostActions from "./post-actions";
import { auth } from "@/server/auth";
import { getPostLikeByIdAndUserId } from "@/lib/like";
import { getBookmarkByIdAndUserId } from "@/lib/bookmark";

const Post = async ({ post }: { post: PostWithDetails }) => {
  const session = await auth();

  if (!post.user || !session) return null;

  const likedPost = await getPostLikeByIdAndUserId(post.id, session.user.id);
  const isLiked = likedPost ? true : false;

  const bookmarkedPost = await getBookmarkByIdAndUserId(
    post.id,
    session.user.id
  );
  const isBookmarked = bookmarkedPost ? true : false;

  return (
    <Card>
      <CardHeader className="flex flex-row gap-4 space-y-0 items-center">
        {post.user.image ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.image} />
          </Avatar>
        ) : (
          <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
            <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
              {post.user.name![0]}
            </p>
          </div>
        )}
        <h1 className="text-sm space-y-0 mt-0 font-medium">{post.user.name}</h1>
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
            <span className="text-primary font-medium">{post.user.name}</span>{" "}
            {post.caption}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
