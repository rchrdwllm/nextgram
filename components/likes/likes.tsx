import { getCurrentUserLikes } from "@/lib/like";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Likes = async () => {
  const { success: likes, error } = await getCurrentUserLikes();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!likes) {
    return <div>No likes</div>;
  }

  return (
    <Card className="border-0 p-0 flex flex-col gap-4 shadow-none">
      <CardHeader className="p-0">
        <CardTitle>Your likes</CardTitle>
        <CardDescription>You have {likes.length} likes</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <PostsGrid>
          {likes.map((like) => (
            <PostPreview tab="postLikes" key={like.id} postId={like.postId} />
          ))}
        </PostsGrid>
      </CardContent>
    </Card>
  );
};

export default Likes;
