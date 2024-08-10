import { getImageBlur } from "@/lib/image";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ImageWithBlur = async ({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) => {
  const { success: base64, error } = await getImageBlur(src);

  if (error) {
    return <Image src={src} alt={alt ?? ""} className="object-cover" fill />;
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      placeholder="blur"
      blurDataURL={base64}
      className={cn("object-cover rounded-md", className)}
      fill
    />
  );
};

export default ImageWithBlur;
