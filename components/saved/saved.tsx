import { getCurrentUserBookmarks } from "@/lib/bookmark";
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

const Saved = async () => {
  const session = await auth();

  if (!session) {
    return <div>You need to be logged in to view this page</div>;
  }

  const { success: postBookmarks, error } = await getCurrentUserBookmarks();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!postBookmarks) {
    return <div>No liked posts</div>;
  }

  return (
    <Card className="border-0 p-0">
      <CardHeader className="p-0">
        <CardTitle>Saved Posts</CardTitle>
        <CardDescription>{postBookmarks?.length} posts</CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-8">
        <PostsGrid>
          {postBookmarks.map((postBookmark) => (
            <PostPreview
              key={postBookmark.id}
              postId={postBookmark.postId}
              tab="postBookmarks"
            />
          ))}
        </PostsGrid>
      </CardContent>
    </Card>
  );
};

export default Saved;
