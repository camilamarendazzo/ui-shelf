import { Contrast, Palette } from "lucide-react";
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
      "Color harmonies from a base color, with lockable swatches and export.",
    color: "#FF9985",
    icon: Palette,
    comingSoon: true,
  },
];
