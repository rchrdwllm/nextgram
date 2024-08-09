ALTER TABLE "postBookmark" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "postLike" ADD COLUMN "createdAt" timestamp DEFAULT now();