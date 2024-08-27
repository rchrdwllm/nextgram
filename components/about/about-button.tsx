import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";

const AboutButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 font-normal text-muted-foreground text-sm transition-colors hover:text-primary"
        >
          About
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About this project</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-muted-foreground">
          <p>
            Hello! This is an Instagram clone project, built with Next.js,
            TypeScript, Framer Motion, Drizzle, and NeonDB. While most of the
            functionalities I wanted to implement are done, the project still in
            the works. If you have any suggestions or feedback, please feel free
            to reach out to me on{" "}
            <Link
              href="https://www.x.com/imrchrdwllm"
              className="transition-colors underline hover:text-primary"
              target="_blank"
            >
              Twitter
            </Link>{" "}
            or Discord (@uiriaaamu).
          </p>
          <p>
            I'm also available on{" "}
            <Link
              className="transition-colors underline hover:text-primary"
              href="https://www.github.com/rchrdwllm"
              target="_blank"
            >
              Github
            </Link>
            , and{" "}
            <Link
              className="transition-colors underline hover:text-primary"
              href="https://rchrdwllm.vercel.app/"
              target="_blank"
            >
              here's
            </Link>{" "}
            my portfolio.
          </p>
          <p>
            Thanks for checking out this project! I hope you enjoy it as much as
            I enjoyed making it. 😊
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutButton;
