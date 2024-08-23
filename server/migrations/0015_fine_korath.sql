CREATE TABLE IF NOT EXISTS "postReply" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"userId" text NOT NULL,
	"postId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postReply" ADD CONSTRAINT "postReply_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postReply" ADD CONSTRAINT "postReply_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
