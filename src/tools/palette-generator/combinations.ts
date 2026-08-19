import { hslToRgb, randomColor, rgbToHsl } from "../../lib/color";
import type { Rgb } from "../../lib/color";

export const COMBINATIONS = [
  "random",
  "complementary",
  "analogous",
  "triadic",
  "monochromatic",
] as const;

export type Combination = (typeof COMBINATIONS)[number];

export const COMBINATION_LABELS: Record<Combination, string> = {
  random: "Random",
  complementary: "Complementary",
  triadic: "Triadic",
  analogous: "Analogous",
  monochromatic: "Monochromatic",
};

// Ready-made options for the shared <Select>.
export const COMBINATION_OPTIONS = COMBINATIONS.map((value) => ({
  value,
  label: COMBINATION_LABELS[value],
}));

const ANALOGOUS_SPREAD = 40; // degrees on either side of the base hue

const between = (min: number, max: number) => min + Math.random() * (max - min);
const normalizeHue = (h: number) => ((h % 360) + 360) % 360;

// The hue for swatch `i`, relative to the base hue, per combination.
function hueFor(
  combination: Combination,
  baseHue: number,
  i: number,
  count: number,
): number {
  switch (combination) {
    case "complementary":
      return normalizeHue(baseHue + (i % 2) * 180);
    case "triadic":
      return normalizeHue(baseHue + (i % 3) * 120);
    case "analogous":
      return count === 1
        ? normalizeHue(baseHue)
        : normalizeHue(
            baseHue -
              ANALOGOUS_SPREAD +
              (2 * ANALOGOUS_SPREAD * i) / (count - 1),
          );
    default: // monochromatic (and any fallback) hold a single hue
      return normalizeHue(baseHue);
  }
}

// Even lightness steps from light to dark — gives a monochromatic set its depth.
function monochromaticLightness(i: number, count: number): number {
  const lightest = 0.78;
  const darkest = 0.32;
  if (count === 1) return (lightest + darkest) / 2;
  return lightest - ((lightest - darkest) * i) / (count - 1);
}

// Generates `count` colors following a color-theory relationship. `base` anchors
// the hue (e.g. a locked swatch); without it a random base hue is chosen, so each
// call still varies. `random` ignores the relationship entirely.
export function generatePalette(
  combination: Combination,
  count: number,
  base?: Rgb,
): Rgb[] {
  if (combination === "random") {
    return Array.from({ length: count }, () => randomColor());
  }

  const baseHsl = base ? rgbToHsl(base) : null;
  const baseHue = baseHsl ? baseHsl.h : Math.random() * 360;
  // Keep the base's saturation when it's colorful; otherwise pick a lively one.
  const saturation =
    baseHsl && baseHsl.s > 0.2 ? baseHsl.s : between(0.55, 0.8);

  return Array.from({ length: count }, (_, i) => {
    const h = hueFor(combination, baseHue, i, count);
    const l =
      combination === "monochromatic"
        ? monochromaticLightness(i, count)
        : between(0.45, 0.68);
    return hslToRgb({ h, s: saturation, l });
  });
}
