import { getPostReplyIdsByPostId } from "@/lib/reply";
import Reply from "./reply";

const Replies = async ({ postId }: { postId: string }) => {
  const { success: postReplyIds, error: postReplyIdsError } =
    await getPostReplyIdsByPostId(postId);

  if (postReplyIdsError) return <div>Error: {postReplyIdsError}</div>;

  if (!postReplyIds) return <div>Post replies not found</div>;

  return (
    <div className="flex flex-col gap-4">
      {postReplyIds.map((replyId) => (
        <Reply key={replyId} replyId={replyId} />
      ))}
    </div>
  );
};

export default Replies;
