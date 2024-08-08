import { House, Search, PlusSquareIcon, Heart } from "lucide-react";

export const navLinks = [
  {
    label: "feed",
    href: "/feed",
    Icon: House,
  },
  {
    label: "search",
    href: "/search",
    Icon: Search,
  },
  {
    label: "create",
    href: undefined,
    Icon: PlusSquareIcon,
  },
  {
    label: "notifications",
    href: "/notifications",
    Icon: Heart,
  },
];
