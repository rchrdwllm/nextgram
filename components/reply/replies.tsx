import { getPostReplyIdsByPostId } from "@/lib/reply";
import Reply from "./reply";
import { ScrollArea } from "../ui/scroll-area";
import { Suspense } from "react";
import ReplySkeleton from "./reply-skeleton";

const Replies = async ({ postId }: { postId: string }) => {
  const { success: postReplyIds, error: postReplyIdsError } =
    await getPostReplyIdsByPostId(postId);

  if (postReplyIdsError) return <div>Error: {postReplyIdsError}</div>;

  if (!postReplyIds) return <div>Post replies not found</div>;

  return (
    <ScrollArea className="h-[300px]">
      {postReplyIds.map((replyId) => (
        <Suspense fallback={<ReplySkeleton />}>
          <Reply key={replyId} replyId={replyId} />
        </Suspense>
      ))}
    </ScrollArea>
  );
};

export default Replies;
