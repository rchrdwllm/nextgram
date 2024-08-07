CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL
);
