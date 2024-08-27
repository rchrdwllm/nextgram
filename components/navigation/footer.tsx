import Link from "next/link";
import AboutButton from "../about/about-button";

const Footer = () => {
  return (
    <div className="mt-4">
      <AboutButton />
      <p className="text-sm text-muted-foreground">
        © 2024 Nextgram - Designed and developed by{" "}
        <span>
          <Link
            href="https://rchrdwllm.vercel.app/"
            className="transition-colors hover:text-primary hover:underline"
            target="_blank"
          >
            @rchrdwllm
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Footer;
