import { getPlaiceholder } from "plaiceholder";

export const getImgBlur = async (url: string) => {
  try {
    const buffer = await fetch(url).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    console.log(base64);

    return { success: base64 };
  } catch (error) {
    return { error: "Failed to get image" };
  }
};
