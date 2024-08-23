import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { getReplyById } from "@/lib/reply";
import { getUserById } from "@/lib/user";

const Reply = async ({ replyId }: { replyId: number }) => {
  const { success: reply, error: replyError } = await getReplyById(replyId);

  if (replyError) return <div>Error: {replyError}</div>;

  if (!reply) return <div>Reply not found</div>;

  const { success: replyUser, error: replyUserError } = await getUserById(
    reply.userId
  );

  if (replyUserError) return <div>Error: {replyUserError}</div>;

  if (!replyUser) return <div>User not found</div>;

  return (
    <article className="flex gap-3 items-center">
      <div>
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
      </div>
      <div className="w-full">
        <p className="text-sm font-medium">
          {replyUser.name} <span className="font-normal">{reply.content}</span>
        </p>
        <div className="flex gap-2 items-center text-xs text-muted-foreground">
          <p>
            {reply.createdAt!.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>100 likes</p>
          <p>Reply</p>
        </div>
      </div>
      <Toggle>
        <Heart className="h-4 w-4" />
      </Toggle>
    </article>
  );
};

export default Reply;
