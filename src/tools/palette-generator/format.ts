import { formatHex, formatHsl, formatRgb } from "@/lib/color";
import type { Rgb } from "@/lib/color";

export const FORMATS = ["hex", "rgb", "hsl"] as const;
export type ColorFormat = (typeof FORMATS)[number];

export function formatColor(rgb: Rgb, format: ColorFormat): string {
  switch (format) {
    case "rgb":
      return formatRgb(rgb);
    case "hsl":
      return formatHsl(rgb);
    default:
      return formatHex(rgb);
  }
}
