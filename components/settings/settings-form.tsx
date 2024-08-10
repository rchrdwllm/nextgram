"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/form_schemas/settings-schema";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UploadButton } from "../upload-thing/upload-thing";
import { Switch } from "../ui/switch";
import { Session } from "next-auth";
import { updateSettings } from "@/server/actions/update-settings";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const SettingsForm = ({ session: { user } }: { session: Session }) => {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      currentPassword: undefined,
      newPassword: undefined,
      twoFactorEnabled: user.twoFactorEnabled ?? false,
      id: user.id,
      image: user.image ?? undefined,
      bio: user.bio ?? "",
    },
  });
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const { execute, status } = useAction(updateSettings, {
    onExecute: () => {
      toast.loading("Updating settings...");
    },
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      }

      if (data?.error) {
        toast.dismiss();
        toast.error(data.error);
      }
    },
  });

  useEffect(() => {
    form.setValue("name", user.name ?? "");
    form.setValue("email", user.email ?? "");
    form.setValue("twoFactorEnabled", user.twoFactorEnabled ?? false);
    form.setValue("bio", user.bio ?? "");
  }, []);

  const handleSubmit = (values: z.infer<typeof settingsSchema>) => {
    execute({ ...values, id: user.id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          name="image"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col items-center justify-center gap-4">
                  {form.getValues("image") ? (
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={form.getValues("image")}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                          <p className="text-xl font-bold">{user.name![0]}</p>
                        </div>
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                      <p className="text-xl font-bold">{user.name![0]}</p>
                    </div>
                  )}
                  <UploadButton
                    endpoint="avatarUploader"
                    appearance={{
                      button:
                        "bg-secondary px-8 text-sm text-primary transition-colors hover:bg-primary/10",
                      allowedContent: "text-muted-foreground",
                    }}
                    onUploadBegin={() => {
                      setIsAvatarUploading(true);
                    }}
                    onClientUploadComplete={(imgs) => {
                      const uploadedImg = imgs[0];

                      form.setValue("image", uploadedImg.url);

                      setIsAvatarUploading(false);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={user.isOAuth}
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@gmail.com"
                  type="email"
                  disabled={user.isOAuth}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="I'm a developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="************"
                  disabled={user.isOAuth}
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  placeholder="************"
                  disabled={user.isOAuth}
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="twoFactorEnabled"
          render={() => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>2FA Enabled</FormLabel>
              <FormControl>
                <Switch
                  checked={form.getValues("twoFactorEnabled")}
                  onCheckedChange={(checked) => {
                    form.setValue("twoFactorEnabled", checked);
                  }}
                  disabled={user.isOAuth}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn(
            status === "executing" ? "animate-pulse pointer-events-none" : ""
          )}
          disabled={isAvatarUploading}
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
