import { useState } from "react";
import PaletteHeader from "./components/PaletteHeader";
import Swatch from "./components/Swatch";
import type { ColorFormat } from "./format";
import { usePalette } from "./usePalette";
import { useShuffleShortcut } from "./useShuffleShortcut";

function PaletteGenerator() {
  const {
    palette,
    combination,
    randomize,
    setCombination,
    toggleLock,
    setColor,
  } = usePalette();
  const [format, setFormat] = useState<ColorFormat>("hex");
  useShuffleShortcut(randomize);

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-8">
      <PaletteHeader
        palette={palette}
        format={format}
        combination={combination}
        onFormatChange={setFormat}
        onCombinationChange={setCombination}
        onShuffle={randomize}
      />

      <ul className="flex min-h-0 flex-1 flex-col sm:flex-row">
        {palette.map((swatch, i) => (
          <li key={i} className="flex min-h-0 min-w-0 flex-1 flex-col">
            <Swatch
              rgb={swatch.rgb}
              locked={swatch.locked}
              format={format}
              onToggleLock={() => toggleLock(i)}
              onChange={(rgb) => setColor(i, rgb)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PaletteGenerator;
