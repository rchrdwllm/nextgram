import { getCurrentUserLikedPosts } from "@/lib/post";
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

  const { success: likedPosts, error } = await getCurrentUserLikedPosts();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!likedPosts) {
    return <div>No liked posts</div>;
  }

  return (
    <Card className="border-0 p-0">
      <CardHeader className="p-0">
        <CardTitle>Liked Posts</CardTitle>
        <CardDescription>{likedPosts?.length} posts</CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-8">
        <PostsGrid>
          {likedPosts.map((post) => (
            <PostPreview key={post.id} postId={post.id} tab="postLikes" />
          ))}
        </PostsGrid>
      </CardContent>
    </Card>
  );
};

export default Likes;
