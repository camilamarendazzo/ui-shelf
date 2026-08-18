export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

const HEX_PATTERN = /^([0-9a-f]{3}|[0-9a-f]{6})$/;

export function parseHex(input: string): Rgb | null {
  const hex = input.trim().replace(/^#/, "").toLowerCase();
  if (!HEX_PATTERN.test(hex)) return null;
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function formatHex({ r, g, b }: Rgb): string {
  const channel = (v: number) => v.toString(16).padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

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

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  h *= 60;
  if (h < 0) h += 360;
  return { h, s, l };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = (h % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rn = 0;
  let gn = 0;
  let bn = 0;
  if (hp < 1) [rn, gn, bn] = [c, x, 0];
  else if (hp < 2) [rn, gn, bn] = [x, c, 0];
  else if (hp < 3) [rn, gn, bn] = [0, c, x];
  else if (hp < 4) [rn, gn, bn] = [0, x, c];
  else if (hp < 5) [rn, gn, bn] = [x, 0, c];
  else [rn, gn, bn] = [c, 0, x];
  const m = l - c / 2;
  const to255 = (v: number) => Math.round((v + m) * 255);
  return { r: to255(rn), g: to255(gn), b: to255(bn) };
}

// Generates a random full hue range, mid-to-high saturation, mid lightness
export function randomColor(): Rgb {
  const h = Math.random() * 360;
  const s = 0.5 + Math.random() * 0.4; // 0.5–0.9
  const l = 0.35 + Math.random() * 0.35; // 0.35–0.7
  return hslToRgb({ h, s, l });
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
