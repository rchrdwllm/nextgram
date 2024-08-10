import { getCurrentUserLikes } from "@/lib/like";
import { auth } from "@/server/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";

const Likes = async () => {
  const session = await auth();

  if (!session) {
    return <div>You need to be logged in to view this page</div>;
  }

  const { success: postLikes, error } = await getCurrentUserLikes();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!postLikes) {
    return <div>No liked posts</div>;
  }

  return (
    <Card className="border-0 p-0">
      <CardHeader className="p-0">
        <CardTitle>Liked Posts</CardTitle>
        <CardDescription>{postLikes?.length} posts</CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-8">
        <PostsGrid>
          {postLikes.map((postLike) => (
            <PostPreview
              key={postLike.id}
              postId={postLike.postId}
              tab="postLikes"
            />
          ))}
        </PostsGrid>
      </CardContent>
    </Card>
  );
};

export default Likes;
