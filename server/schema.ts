import { relations, sql, SQL } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
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
  bio: text("bio"),
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

export const posts = pgTable("post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  caption: text("caption"),
  createdAt: timestamp("createdAt").defaultNow(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
});

export const postImages = pgTable("postImage", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  name: text("name").notNull(),
  size: integer("size").notNull(),
  key: text("key").notNull(),
  postId: text("postId").references(() => posts.id, { onDelete: "cascade" }),
});

export const postLikes = pgTable("postLike", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: text("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const postBookmarks = pgTable("postBookmark", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: text("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const follows = pgTable("follow", {
  id: serial("id").primaryKey(),
  followerId: text("followerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  followingId: text("followingId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts, { relationName: "posts" }),
  postLikes: many(postLikes, { relationName: "userPostLikes" }),
  postBookmarks: many(postBookmarks, { relationName: "userPostBookmarks" }),
  followers: many(follows, { relationName: "followers" }),
  followings: many(follows, { relationName: "followings" }),
}));

export const postRelations = relations(posts, ({ many, one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
    relationName: "posts",
  }),
  postImages: many(postImages, { relationName: "postImages" }),
  postLikes: many(postLikes, { relationName: "postLikes" }),
  postBookmarks: many(postBookmarks, { relationName: "postBookmarks" }),
}));

export const postImagesRelations = relations(postImages, ({ one }) => ({
  posts: one(posts, {
    fields: [postImages.postId],
    references: [posts.id],
    relationName: "postImages",
  }),
}));

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  user: one(users, {
    fields: [postLikes.userId],
    references: [users.id],
    relationName: "userPostLikes",
  }),
  post: one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
    relationName: "postLikes",
  }),
}));

export const postBookmarksRelations = relations(postBookmarks, ({ one }) => ({
  user: one(users, {
    fields: [postBookmarks.userId],
    references: [users.id],
    relationName: "userPostBookmarks",
  }),
  post: one(posts, {
    fields: [postBookmarks.postId],
    references: [posts.id],
    relationName: "postBookmarks",
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: "followers",
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: "followings",
  }),
}));

export function lower(col: AnyPgColumn): any {
  return sql`lower(${col})`;
}
