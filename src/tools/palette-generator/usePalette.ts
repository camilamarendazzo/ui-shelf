import { useState } from "react";
import type { Rgb } from "../../lib/color";
import { generatePalette } from "./combinations";
import type { Combination } from "./combinations";

export interface PaletteSwatch {
  rgb: Rgb;
  locked: boolean;
}

const COUNT = 5;

function randomSwatches(): PaletteSwatch[] {
  return generatePalette("random", COUNT).map((rgb) => ({
    rgb,
    locked: false,
  }));
}

export function usePalette() {
  // Lazy initializer so the colors are rolled once on mount
  const [palette, setPalette] = useState<PaletteSwatch[]>(randomSwatches);
  const [combination, setCombinationState] = useState<Combination>("random");

  const regenerate = (combo: Combination) =>
    setPalette((prev) => {
      const base = prev.find((swatch) => swatch.locked)?.rgb;
      const generated = generatePalette(combo, prev.length, base);
      return prev.map((swatch, i) =>
        swatch.locked ? swatch : { rgb: generated[i], locked: false },
      );
    });

  const randomize = () => regenerate(combination);

  const setCombination = (combo: Combination) => {
    setCombinationState(combo);
    regenerate(combo);
  };

  const toggleLock = (index: number) =>
    setPalette((prev) =>
      prev.map((swatch, i) =>
        i === index ? { ...swatch, locked: !swatch.locked } : swatch,
      ),
    );

  const setColor = (index: number, rgb: Rgb) =>
    setPalette((prev) =>
      prev.map((swatch, i) => (i === index ? { ...swatch, rgb } : swatch)),
    );

  return {
    palette,
    combination,
    randomize,
    setCombination,
    toggleLock,
    setColor,
  };
}
