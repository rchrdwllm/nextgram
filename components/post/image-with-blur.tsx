import Image from "next/image";
import { getImgBlur } from "@/lib/image";
import { cn } from "@/lib/utils";

const ImageWithBlur = async ({
  url,
  className,
  alt,
}: {
  url: string;
  className?: string;
  alt?: string;
}) => {
  const { success: base64, error } = await getImgBlur(url);

  if (error) {
    return <div>Error</div>;
  }

  if (!base64) {
    return <div>Loading</div>;
  }

  return (
    <Image
      fill
      src={url}
      alt={alt ?? ""}
      placeholder="blur"
      blurDataURL={base64}
      className={cn("rounded-md object-cover", className)}
    />
  );
};

export default ImageWithBlur;
