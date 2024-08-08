import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {}
  ),
  postImageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
