ALTER TABLE "postImage" DROP CONSTRAINT "postImage_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post" DROP CONSTRAINT "post_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postImage" ADD CONSTRAINT "postImage_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
