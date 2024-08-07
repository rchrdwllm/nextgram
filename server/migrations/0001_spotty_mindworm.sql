CREATE TABLE IF NOT EXISTS "emailVerificationToken" (
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL
);
