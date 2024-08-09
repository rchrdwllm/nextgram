import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";
import * as schema from "@/server/schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

export type PostWithDetails = InferResultType<
  "posts",
  { postImages: true; user: true; postLikes: true; postBookmarks: true }
>;

export type PostImage = InferResultType<"postImages">;

export type PostLike = InferResultType<"postLikes">;

export type PostBookmark = InferResultType<"postBookmarks">;
