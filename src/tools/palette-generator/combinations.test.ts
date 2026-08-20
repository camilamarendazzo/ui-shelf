import { describe, expect, it } from "vitest";
import { rgbToHsl } from "../../lib/color";
import type { Rgb } from "../../lib/color";
import { COMBINATIONS, generatePalette } from "./combinations";

const BASE: Rgb = { r: 220, g: 40, b: 40 }; // a saturated red, base hue ~0
const ANALOGOUS_TOLERANCE = 45; // 40° spread + rounding slack

const hues = (palette: Rgb[]) => palette.map((rgb) => rgbToHsl(rgb).h);
const hueGap = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360;
  return Math.min(d, 360 - d);
};

describe("generatePalette", () => {
  it("returns the requested count for every combination", () => {
    for (const combination of COMBINATIONS) {
      for (const count of [3, 5, 8]) {
        expect(generatePalette(combination, count, BASE)).toHaveLength(count);
      }
    }
  });

  it("always produces valid 8-bit colors", () => {
    for (const combination of COMBINATIONS) {
      for (const { r, g, b } of generatePalette(combination, 6, BASE)) {
        for (const channel of [r, g, b]) {
          expect(channel).toBeGreaterThanOrEqual(0);
          expect(channel).toBeLessThanOrEqual(255);
        }
      }
    }
  });

  it("monochromatic holds a single hue", () => {
    const [first, ...rest] = hues(generatePalette("monochromatic", 5, BASE));
    for (const hue of rest) expect(hueGap(hue, first)).toBeLessThan(2);
  });

  it("analogous stays within a narrow band around the base hue", () => {
    const baseHue = rgbToHsl(BASE).h;
    for (const hue of hues(generatePalette("analogous", 5, BASE))) {
      expect(hueGap(hue, baseHue)).toBeLessThanOrEqual(ANALOGOUS_TOLERANCE);
    }
  });

  it("complementary uses two hues ~180° apart", () => {
    const [base, complement] = hues(generatePalette("complementary", 4, BASE));
    expect(hueGap(base, complement)).toBeGreaterThan(170);
    expect(hueGap(base, complement)).toBeLessThan(190);
  });

  it("triadic uses three hues ~120° apart", () => {
    const [a, b, c] = hues(generatePalette("triadic", 3, BASE));
    expect(hueGap(a, b)).toBeGreaterThan(110);
    expect(hueGap(a, b)).toBeLessThan(130);
    expect(hueGap(b, c)).toBeGreaterThan(110);
    expect(hueGap(b, c)).toBeLessThan(130);
  });
});
