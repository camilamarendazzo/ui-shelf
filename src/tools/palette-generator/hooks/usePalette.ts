import { useState } from "react";
import type { Rgb } from "../../../lib/color";
import { generatePalette } from "../combinations";
import type { Combination } from "../combinations";

export interface PaletteSwatch {
  rgb: Rgb;
  locked: boolean;
}

export const MIN_SWATCHES = 3;
export const MAX_SWATCHES = 6;
const DEFAULT_COUNT = 5;

function randomSwatches(): PaletteSwatch[] {
  return generatePalette("random", DEFAULT_COUNT).map((rgb) => ({
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

  const addSwatch = () =>
    setPalette((prev) => {
      if (prev.length >= MAX_SWATCHES) return prev;
      const base = (prev.find((swatch) => swatch.locked) ?? prev[0])?.rgb;
      const generated = generatePalette(combination, prev.length + 1, base);
      return [...prev, { rgb: generated[prev.length], locked: false }];
    });

  const removeSwatch = (index: number) =>
    setPalette((prev) =>
      prev.length <= MIN_SWATCHES ? prev : prev.filter((_, i) => i !== index),
    );

  return {
    palette,
    combination,
    randomize,
    setCombination,
    toggleLock,
    setColor,
    addSwatch,
    removeSwatch,
  };
}
