import { describe, expect, it } from "vitest";
import {
  formatHex,
  formatHsl,
  formatRgb,
  hslToRgb,
  parseHex,
  randomColor,
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

describe("formatRgb", () => {
  it("formats channels as a CSS rgb() string", () => {
    expect(formatRgb({ r: 255, g: 153, b: 133 })).toBe("rgb(255, 153, 133)");
    expect(formatRgb(BLACK)).toBe("rgb(0, 0, 0)");
  });
});

describe("formatHsl", () => {
  it("rounds to whole degrees and percentages", () => {
    expect(formatHsl({ r: 255, g: 0, b: 0 })).toBe("hsl(0, 100%, 50%)");
    expect(formatHsl(WHITE)).toBe("hsl(0, 0%, 100%)");
    expect(formatHsl({ r: 128, g: 128, b: 128 })).toBe("hsl(0, 0%, 50%)");
  });
});

describe("randomColor", () => {
  it("stays in the intended mid lightness band (never near-black or near-white)", () => {
    // Rounding to 8-bit channels and back can shift lightness by up to ~1/255,
    // so allow that quantization slack around the 0.35–0.7 generation band.
    const epsilon = 1 / 255;
    for (let i = 0; i < 500; i++) {
      const { l } = rgbToHsl(randomColor());
      expect(l).toBeGreaterThanOrEqual(0.35 - epsilon);
      expect(l).toBeLessThanOrEqual(0.7 + epsilon);
    }
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
