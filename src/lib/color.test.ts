import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  formatHex,
  formatRatio,
  hslToRgb,
  parseHex,
  relativeLuminance,
  rgbToHsl,
} from "./color";

const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

describe("parseHex", () => {
  it("parses 6-digit hex with or without #", () => {
    expect(parseHex("#ffffff")).toEqual(WHITE);
    expect(parseHex("ffffff")).toEqual(WHITE);
  });

  it("parses 3-digit hex by expanding each digit", () => {
    expect(parseHex("#fff")).toEqual(WHITE);
    expect(parseHex("#abc")).toEqual({ r: 170, g: 187, b: 204 });
  });

  it("is not case sensitive and trims whitespace", () => {
    expect(parseHex("FFF")).toEqual(WHITE);
    expect(parseHex(" #1F1B10 ")).toEqual({ r: 31, g: 27, b: 16 });
  });

  it("rejects invalid input", () => {
    expect(parseHex("")).toBeNull();
    expect(parseHex("#ff")).toBeNull();
    expect(parseHex("#ffff")).toBeNull();
    expect(parseHex("#gggggg")).toBeNull();
    expect(parseHex("#1234567")).toBeNull();
  });
});

describe("formatHex", () => {
  it("zero-pads channels to lowercase #rrggbb", () => {
    expect(formatHex({ r: 0, g: 0, b: 15 })).toBe("#00000f");
    expect(formatHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
  });

  it("round-trips through parseHex", () => {
    const color = { r: 244, g: 195, b: 9 };
    expect(parseHex(formatHex(color))).toEqual(color);
  });
});

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

describe("rgbToHsl / hslToRgb", () => {
  it("converts pure red", () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 1, l: 0.5 });
  });

  it("treats grays as zero saturation and zero hue", () => {
    const gray = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(gray.s).toBe(0);
    expect(gray.h).toBe(0);
  });

  it("round-trips primaries and theme colors", () => {
    for (const hex of ["#ff0000", "#00ff00", "#0000ff", "#f4c309", "#1f1b10"]) {
      const rgb = parseHex(hex);
      expect(rgb).not.toBeNull();
      if (rgb) {
        expect(hslToRgb(rgbToHsl(rgb))).toEqual(rgb);
      }
    }
  });

  it("handles black and white at the lightness extremes", () => {
    expect(hslToRgb({ h: 0, s: 0, l: 0 })).toEqual(BLACK);
    expect(hslToRgb({ h: 0, s: 0, l: 1 })).toEqual(WHITE);
  });
});
