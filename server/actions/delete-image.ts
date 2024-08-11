"use server";

import { deleteImageSchema } from "@/form_schemas/delete-image-schema";
import { actionClient } from "./action-client";
import { deleteUploadthingImages } from "@/lib/uploadthing";

export const deleteImage = actionClient
  .schema(deleteImageSchema)
  .action(async ({ parsedInput }) => {
    const { key } = parsedInput;

    try {
      const { error } = await deleteUploadthingImages([key]);

      if (error) {
        return { error };
      }

      return { success: "Image deleted" };
    } catch (error) {
      return { error: "Failed to delete image" };
    }
  });
