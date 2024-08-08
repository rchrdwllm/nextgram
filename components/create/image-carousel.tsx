import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

type ImageCarouselProps = {
  images: string[];
};

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <Carousel className="w-[80%]">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image}>
            <AspectRatio ratio={1}>
              <Image
                fill
                src={image}
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
