CREATE TABLE IF NOT EXISTS "twoFactorToken" (
	"token" text PRIMARY KEY NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL
);
