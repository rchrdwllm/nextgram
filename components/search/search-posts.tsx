import PostPreview from "@/components/post/post-preview";
import PostsGrid from "@/components/post/posts-grid";
import { getPostsByQuery } from "@/lib/post";

const SearchPosts = async ({ query }: { query: string }) => {
  const { success: searchPosts, error } = query
    ? await getPostsByQuery(query)
    : {
        success: [],
        error: null,
      };

  if (error) return <div>{error}</div>;

  if (!searchPosts) return <div>No posts found</div>;

  return (
    <PostsGrid>
      {searchPosts.map((postId) => (
        <PostPreview fromSearch key={postId} postId={postId} />
      ))}
    </PostsGrid>
  );
};

export default SearchPosts;
