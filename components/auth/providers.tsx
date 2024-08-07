import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Providers = () => {
  return (
    <div className="flex gap-4">
      <Button className="w-full flex items-center gap-2" variant="outline">
        <FaGithub />
        <span>Github</span>
      </Button>
      <Button className="w-full flex items-center gap-2" variant="outline">
        <FcGoogle />
        <span>Google</span>
      </Button>
    </div>
  );
};

export default Providers;
