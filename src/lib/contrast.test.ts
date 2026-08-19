import { describe, expect, it } from "vitest";
import { parseHex, rgbToHsl } from "./color";
import {
  adjustLightnessToPass,
  contrastRatio,
  formatRatio,
  relativeLuminance,
} from "./contrast";

const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

describe("relativeLuminance", () => {
  it("is 1 for white and 0 for black", () => {
    expect(relativeLuminance(WHITE)).toBeCloseTo(1, 5);
    expect(relativeLuminance(BLACK)).toBeCloseTo(0, 5);
  });

  it("matches the WCAG channel coefficients for primaries", () => {
    expect(relativeLuminance({ r: 255, g: 0, b: 0 })).toBeCloseTo(0.2126, 4);
    expect(relativeLuminance({ r: 0, g: 255, b: 0 })).toBeCloseTo(0.7152, 4);
    expect(relativeLuminance({ r: 0, g: 0, b: 255 })).toBeCloseTo(0.0722, 4);
  });

  it("uses the power curve for mid grays", () => {
    expect(relativeLuminance({ r: 128, g: 128, b: 128 })).toBeCloseTo(
      0.2159,
      3,
    );
  });
});

describe("contrastRatio", () => {
  it("is 21 for black on white, regardless of argument order", () => {
    expect(contrastRatio(BLACK, WHITE)).toBeCloseTo(21, 2);
    expect(contrastRatio(WHITE, BLACK)).toBeCloseTo(21, 2);
  });

  it("is 1 for identical colors", () => {
    expect(contrastRatio(WHITE, WHITE)).toBe(1);
  });

  it("gives the well-known ~4.54 for #767676 on white", () => {
    const gray = { r: 118, g: 118, b: 118 };
    const ratio = contrastRatio(gray, WHITE);
    expect(ratio).toBeGreaterThan(4.5);
    expect(ratio).toBeLessThan(4.6);
  });

  it("upholds the token contract: brand-deep passes AA on paper", () => {
    const brandDeep = { r: 138, g: 109, b: 0 };
    const paper = { r: 254, g: 251, b: 240 };
    expect(contrastRatio(brandDeep, paper)).toBeGreaterThanOrEqual(4.5);
  });

  it("upholds the token contract: brand gold is surface-only on paper", () => {
    const brand = { r: 244, g: 195, b: 9 };
    const paper = { r: 254, g: 251, b: 240 };
    expect(contrastRatio(brand, paper)).toBeLessThan(3);
  });

  it("upholds the token contract: ink passes AA on brand gold", () => {
    const ink = { r: 31, g: 27, b: 16 };
    const brand = { r: 244, g: 195, b: 9 };
    expect(contrastRatio(ink, brand)).toBeGreaterThanOrEqual(4.5);
  });

  it("upholds the token contract: ink passes AA on gold-soft", () => {
    const ink = { r: 31, g: 27, b: 16 };
    const goldSoft = { r: 251, g: 239, b: 179 };
    expect(contrastRatio(ink, goldSoft)).toBeGreaterThanOrEqual(4.5);
  });

  it("upholds the token contract: success passes AA on paper", () => {
    const success = { r: 41, g: 92, b: 15 };
    const paper = { r: 254, g: 251, b: 240 };
    expect(contrastRatio(success, paper)).toBeGreaterThanOrEqual(4.5);
  });

  it("upholds the token contract: error passes AA on paper", () => {
    const error = { r: 160, g: 37, b: 8 };
    const paper = { r: 254, g: 251, b: 240 };
    expect(contrastRatio(error, paper)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("formatRatio", () => {
  it("truncates instead of rounding so display never contradicts badges", () => {
    expect(formatRatio(4.4999)).toBe("4.49:1");
  });

  it("drops trailing zeros", () => {
    expect(formatRatio(4.5)).toBe("4.5:1");
    expect(formatRatio(21)).toBe("21:1");
  });

  it("keeps two decimals when present", () => {
    expect(formatRatio(4.532)).toBe("4.53:1");
  });
});

describe("adjustLightnessToPass", () => {
  it("returns null when the pair already passes the target ratio", () => {
    expect(adjustLightnessToPass(BLACK, WHITE, 4.5)).toBeNull();
    expect(adjustLightnessToPass(WHITE, BLACK, 7)).toBeNull();
  });

  it("darkens a light-gray foreground to pass AA normal against white", () => {
    const lightGray = { r: 180, g: 180, b: 180 }; // ~2.8:1 against white — fails AA
    const result = adjustLightnessToPass(lightGray, WHITE, 4.5);
    expect(result).not.toBeNull();
    expect(contrastRatio(result!, WHITE)).toBeGreaterThanOrEqual(4.5);
    expect(rgbToHsl(result!).l).toBeLessThan(rgbToHsl(lightGray).l);
  });

  it("lightens a dark-gray foreground to pass AA normal against a dark background", () => {
    const darkGray = { r: 80, g: 80, b: 80 };
    const darkBg = { r: 30, g: 30, b: 30 };
    const result = adjustLightnessToPass(darkGray, darkBg, 4.5);
    expect(result).not.toBeNull();
    expect(contrastRatio(result!, darkBg)).toBeGreaterThanOrEqual(4.5);
    expect(rgbToHsl(result!).l).toBeGreaterThan(rgbToHsl(darkGray).l);
  });

  it("returns null when no lightness can reach the target against a mid-tone background", () => {
    // #888888 has luminance ~0.216; neither black (~5.9:1) nor white (~3.55:1) reach 7:1
    const midGray = parseHex("#888888")!;
    const input = { r: 200, g: 150, b: 100 }; // warm color, low contrast against mid-gray
    expect(adjustLightnessToPass(input, midGray, 7)).toBeNull();
  });
});
