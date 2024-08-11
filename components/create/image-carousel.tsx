import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteImage } from "@/server/actions/delete-image";
import * as z from "zod";
import { createSchema } from "@/form_schemas/create-schema";
import { toast } from "sonner";

type ImageCarouselProps = {
  imgUrls: string[];
  handleClientImageDelete: (index: number) => Promise<void>;
  images: z.infer<typeof createSchema>["images"];
};

const ImageCarousel = ({
  imgUrls,
  handleClientImageDelete,
  images,
}: ImageCarouselProps) => {
  const { execute } = useAction(deleteImage, {
    onExecute: () => {
      toast.loading("Deleting image...");
    },
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data?.success);
      }

      if (data?.error) {
        toast.dismiss();
        toast.error(data.error);
      }
    },
  });

  const handleRemove = (key: string, index: number) => {
    execute({
      key,
    });

    handleClientImageDelete(index);
  };

  return (
    <Carousel className="w-[80%]">
      <CarouselContent>
        {imgUrls.map((url, index) => (
          <CarouselItem className="relative" key={url}>
            <Button
              onClick={() => handleRemove(images[index].key, index)}
              className="absolute top-2 right-2 w-10 p-0 rounded-full z-[1] bg-primary/30"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <AspectRatio ratio={1}>
              <Image
                fill
                src={url}
                alt=""
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageCarousel;
