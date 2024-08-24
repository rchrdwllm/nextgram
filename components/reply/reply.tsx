import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import OptimisticLikeWrapper from "./optimistic-like-wrapper";
import { getReplyById } from "@/lib/reply";
import { getUserById } from "@/lib/user";
import LikeReplyButton from "./like-reply-button";
import ReplyLikesCount from "./reply-likes-count";
import { getReplyLikeByIdAndUserId } from "@/lib/reply-like";
import { auth } from "@/server/auth";
import ReplyActions from "./reply-actions";
import Link from "next/link";

const Reply = async ({ replyId }: { replyId: number }) => {
  const { success: reply, error: replyError } = await getReplyById(replyId);
  const session = await auth();

  if (!session) return null;

  if (replyError) return <div>Error: {replyError}</div>;

  if (!reply) return <div>Reply not found</div>;

  const { success: replyUser, error: replyUserError } = await getUserById(
    reply.userId
  );

  if (replyUserError) return <div>Error: {replyUserError}</div>;

  if (!replyUser) return <div>User not found</div>;

  const likedReply = await getReplyLikeByIdAndUserId(replyId, session.user.id);
  const isLiked = likedReply ? true : false;
  const isOwner = reply.userId === session.user.id;

  return (
    <article className="mb-2 flex gap-3 items-start">
      <Link href={`/user/${reply.userId}`}>
        {replyUser.image ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={replyUser.image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
                  {replyUser.name![0]}
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="group flex items-center justify-center w-8 h-8 bg-muted rounded-full transition-colors hover:bg-primary">
            <p className="text-sm font-medium transition-colors group-hover:text-primary-foreground">
              {replyUser.name![0]}
            </p>
          </div>
        )}
      </Link>
      <OptimisticLikeWrapper postReply={reply}>
        <div className="w-full">
          <p className="text-sm font-medium">
            <Link href={`/user/${reply.userId}`}>{replyUser.name} </Link>
            <span className="font-normal">{reply.content}</span>
          </p>
          <div className="flex gap-2 items-center text-xs text-muted-foreground">
            <p>
              {reply.createdAt!.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <ReplyLikesCount />
            <p>Reply</p>
            {isOwner && <ReplyActions reply={reply} />}
          </div>
        </div>
        <LikeReplyButton isLiked={isLiked} replyId={reply.id} />
      </OptimisticLikeWrapper>
    </article>
  );
};

export default Reply;
