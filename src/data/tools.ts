import { Contrast, Eye, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  color: string;
  icon: LucideIcon;
  route?: string;
  comingSoon?: boolean;
}

export const tools: Tool[] = [
  {
    name: "Contrast checker",
    description:
      "WCAG contrast ratio and AA/AAA pass–fail for a text and background color pair.",
    color: "#CBE84D",
    icon: Contrast,
    route: "/contrast-checker",
  },
  {
    name: "Palette generator",
    description:
      "Explore different combinations and create unique color palettes.",
    color: "#FF9985",
    icon: Palette,
    route: "/palette-generator",
  },
  {
    name: "Color blindness simulator",
    description:
      "Preview colors under protanopia, deuteranopia, and tritanopia.",
    color: "#8FD3E8",
    icon: Eye,
    comingSoon: true,
  },
];
