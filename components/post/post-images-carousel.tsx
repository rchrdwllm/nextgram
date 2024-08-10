import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { PostImage } from "@/lib/infer-type";
import ImageWithBlur from "./image-with-blur";

type ImageCarouselProps = {
  postImages: PostImage[];
};

const PostImagesCarousel = ({ postImages }: ImageCarouselProps) => {
  return (
    <div className="w-full flex justify-center">
      <Carousel className="w-[80%]">
        <CarouselContent>
          {postImages.map((image) => (
            <CarouselItem key={image.key}>
              <AspectRatio ratio={1}>
                <ImageWithBlur url={image.url} alt={image.name} />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PostImagesCarousel;
