import { hslToRgb, rgbToHsl } from "./color";
import type { Rgb } from "./color";

// WCAG 2.x relative luminance (SC 1.4.3).
// The WCAG 2.2 errata threshold 0.04045 gives bit-identical results for 8-bit channels
// (no value falls between 10/255 and 11/255), so the published 0.03928 is kept.
export function relativeLuminance({ r, g, b }: Rgb): number {
  const linear = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [darker, lighter] = la < lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

// Truncates (never rounds) so the displayed value can't contradict a pass/fail badge:
// 4.4999 shows as "4.49:1", not "4.5:1".
export function formatRatio(ratio: number): string {
  return `${Math.floor(ratio * 100) / 100}:1`;
}

// Returns the L in [lo, hi] closest to the current value where ratioAtL >= targetRatio,
// or null if even the far extreme doesn't reach the target.
// "max": finds the highest passing L (darken search, extreme = lo).
// "min": finds the lowest passing L (lighten search, extreme = hi).
function searchL(
  ratioAtL: (l: number) => number,
  targetRatio: number,
  lo: number,
  hi: number,
  direction: "max" | "min",
): number | null {
  const extreme = direction === "max" ? lo : hi;
  if (ratioAtL(extreme) < targetRatio) return null;
  let l = lo,
    h = hi;
  for (let i = 0; i < 20; i++) {
    const mid = (l + h) / 2;
    if (ratioAtL(mid) >= targetRatio) {
      if (direction === "max") l = mid;
      else h = mid;
    } else {
      if (direction === "max") h = mid;
      else l = mid;
    }
  }
  return direction === "max" ? l : h;
}

// Adjusts `color`'s lightness to achieve `targetRatio` against `other`, picking
// the smallest lightness change. Returns null if already compliant, or if no
// lightness reaches the target (can happen against mid-tone colors).
export function adjustLightnessToPass(
  color: Rgb,
  other: Rgb,
  targetRatio: number,
): Rgb | null {
  if (contrastRatio(color, other) >= targetRatio) return null;

  const hsl = rgbToHsl(color);
  const ratioAtL = (l: number) => contrastRatio(hslToRgb({ ...hsl, l }), other);

  const darkL = searchL(ratioAtL, targetRatio, 0, hsl.l, "max");
  const lightL = searchL(ratioAtL, targetRatio, hsl.l, 1, "min");

  if (darkL === null && lightL === null) return null;
  if (darkL === null) return hslToRgb({ ...hsl, l: lightL! });
  if (lightL === null) return hslToRgb({ ...hsl, l: darkL });

  return Math.abs(darkL - hsl.l) <= Math.abs(lightL - hsl.l)
    ? hslToRgb({ ...hsl, l: darkL })
    : hslToRgb({ ...hsl, l: lightL });
}
