import { useState } from "react";
import { randomColor } from "../../lib/color";
import type { Rgb } from "../../lib/color";

export interface PaletteSwatch {
  rgb: Rgb;
  locked: boolean;
}

function randomSwatches(): PaletteSwatch[] {
  return Array.from({ length: 5 }, () => ({
    rgb: randomColor(),
    locked: false,
  }));
}

export function usePalette() {
  // Lazy initializer so the five colors are rolled once on mount
  const [palette, setPalette] = useState<PaletteSwatch[]>(randomSwatches);

  const randomize = () => setPalette(randomSwatches());

  return { palette, randomize };
}
