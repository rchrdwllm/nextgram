import { Images } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { UploadButton } from "../upload-thing/upload-thing";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSchema } from "@/form_schemas/create-schema";
import * as z from "zod";
import ImageCarousel from "./image-carousel";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "../ui/textarea";

const CreateForm = ({
  onOpenChange,
}: {
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      caption: "",
      images: [],
    },
  });
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const { append } = useFieldArray({
    control: form.control,
    name: "images",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (values: z.infer<typeof createSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        {imgUrls.length > 0 ? (
          <ImageCarousel images={imgUrls} />
        ) : (
          <Images className="h-32 w-32 text-muted" />
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="images"
            render={() => (
              <FormItem>
                <FormControl className="flex flex-col gap-4 items-center justify-center">
                  <UploadButton
                    endpoint="postImageUploader"
                    appearance={{
                      button:
                        "bg-secondary px-6 text-sm transition-colors hover:bg-secondary/80",
                    }}
                    onBeforeUploadBegin={(imgs) => {
                      setImgUrls(imgs.map((img) => URL.createObjectURL(img)));

                      return imgs;
                    }}
                    onUploadBegin={() => {
                      setIsUploading(true);
                    }}
                    onClientUploadComplete={(imgs) => {
                      imgs.forEach((img) => {
                        append({
                          url: img.url,
                          key: img.key,
                          name: img.name,
                          size: img.size,
                        });
                      });

                      setIsUploading(false);
                    }}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imgUrls.length ? (
            <FormField
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <div className="flex gap-4">
            <Button
              onClick={(e) => {
                e.preventDefault();

                onOpenChange(false);
              }}
              disabled={isUploading}
              variant="secondary"
              className="w-full"
            >
              Cancel
            </Button>
            <Button disabled={isUploading} type="submit" className="w-full">
              Post
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateForm;
