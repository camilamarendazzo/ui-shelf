import { describe, expect, it } from "vitest";
import { levels } from "./levels";

describe("WCAG levels", () => {
  it("pins each threshold to the WCAG 2.x spec value", () => {
    expect(levels).toEqual([
      { label: "AA normal", threshold: 4.5 },
      { label: "AA large", threshold: 3 },
      { label: "AAA normal", threshold: 7 },
      { label: "AAA large", threshold: 4.5 },
    ]);
  });
});
