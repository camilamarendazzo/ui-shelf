import { describe, expect, it } from "vitest";
import { contrastRatio, parseHex } from "../lib/color";
import { tools } from "./tools";

// Paired with --color-ink in src/index.css (update together).
const INK = { r: 31, g: 27, b: 16 };

describe("tool registry", () => {
  describe("integrity", () => {
    it("is never empty", () => {
      expect(tools.length).toBeGreaterThan(0);
    });

    it("has a unique name per tool", () => {
      const names = tools.map((tool) => tool.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it("lists every tool as live or coming soon", () => {
      for (const tool of tools) {
        expect(
          Boolean(tool.route) || tool.comingSoon,
          `${tool.name} needs a route or comingSoon, otherwise its card looks live but links nowhere`,
        ).toBe(true);
      }
    });
  });

  describe("formatting", () => {
    it("gives every tool a valid hex color", () => {
      for (const tool of tools) {
        expect(parseHex(tool.color), `${tool.name} color`).not.toBeNull();
      }
    });

    it("gives live tools an absolute kebab-case route", () => {
      for (const tool of tools) {
        if (tool.route) {
          expect(tool.route, `${tool.name} route`).toMatch(/^\/[a-z0-9-]+$/);
        }
      }
    });

    it("has a unique route per live tool", () => {
      const routes = tools.map((tool) => tool.route).filter(Boolean);
      expect(new Set(routes).size).toBe(routes.length);
    });
  });

  describe("accessibility", () => {
    it("keeps ink text AA-readable on every tool color", () => {
      for (const tool of tools) {
        const rgb = parseHex(tool.color);
        if (rgb) {
          expect(
            contrastRatio(rgb, INK),
            `${tool.name} color vs ink`,
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    });
  });
});
