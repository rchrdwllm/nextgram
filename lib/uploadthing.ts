import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUploadthingImages = async (keys: string[]) => {
  try {
    await utapi.deleteFiles(keys);

    return { success: "Images deleted" };
  } catch (error) {
    return { error: "Failed to delete images" };
  }
};
