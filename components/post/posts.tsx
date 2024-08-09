import { getPosts } from "@/lib/post";
import Post from "./post";

const Posts = async () => {
  const { success, error } = await getPosts();

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {success?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
