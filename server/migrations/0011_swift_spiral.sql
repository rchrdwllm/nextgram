CREATE TABLE IF NOT EXISTS "postBookmark" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"postId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postBookmark" ADD CONSTRAINT "postBookmark_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postBookmark" ADD CONSTRAINT "postBookmark_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
