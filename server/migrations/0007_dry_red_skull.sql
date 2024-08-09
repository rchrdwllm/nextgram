CREATE TABLE IF NOT EXISTS "postImage" (
	"id" serial PRIMARY KEY NOT NULL,
	"postId" text,
	"url" text NOT NULL,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"key" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" text PRIMARY KEY NOT NULL,
	"caption" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postImage" ADD CONSTRAINT "postImage_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
