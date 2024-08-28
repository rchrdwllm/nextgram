import {
  House,
  Search,
  PlusSquareIcon,
  Heart,
  Bell,
  Bookmark,
  Settings,
} from "lucide-react";

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

export const desktopNavLinks = [
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
    label: "likes",
    href: "/likes",
    Icon: Heart,
  },
  {
    label: "saved",
    href: "/saved",
    Icon: Bookmark,
  },
  {
    label: "notifications",
    href: "/notifications",
    Icon: Bell,
  },
  {
    label: "settings",
    href: "/settings",
    Icon: Settings,
  },
];
