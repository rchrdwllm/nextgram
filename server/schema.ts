import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const emailVerificationTokens = pgTable("emailVerificationToken", {
  token: text("token").primaryKey().notNull(),
  expires: timestamp("expires").notNull(),
  email: text("email").notNull(),
});

export const passwordResetTokens = pgTable("passwordResetToken", {
  token: text("token").primaryKey().notNull(),
  expires: timestamp("expires").notNull(),
  email: text("email").notNull(),
});

export const twoFactorTokens = pgTable("twoFactorToken", {
  token: text("token").primaryKey().notNull(),
  expires: timestamp("expires").notNull(),
  email: text("email").notNull(),
  password: text("password"),
});
