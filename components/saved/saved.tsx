import { getCurrentUserBookmarks } from "@/lib/bookmark";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Saved = async () => {
  const { success: bookmarks, error } = await getCurrentUserBookmarks();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookmarks) {
    return <div>No bookmarks</div>;
  }

  return (
    <Card className="border-0 p-0 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle>Your bookmarks</CardTitle>
        <CardDescription>You have {bookmarks.length} bookmarks</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <PostsGrid>
          {bookmarks.map((bookmark) => (
            <PostPreview key={bookmark.id} postId={bookmark.postId} />
          ))}
        </PostsGrid>
      </CardContent>
    </Card>
  );
};

export default Saved;
