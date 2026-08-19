import { useState } from "react";
import PaletteHeader from "./components/PaletteHeader";
import Swatch from "./components/Swatch";
import type { ColorFormat } from "./format";
import { usePalette } from "./usePalette";
import { useShuffleShortcut } from "./useShuffleShortcut";

function PaletteGenerator() {
  const { palette, randomize, toggleLock, setColor } = usePalette();
  const [format, setFormat] = useState<ColorFormat>("hex");
  useShuffleShortcut(randomize);

  return (
    <section className="space-y-12">
      <PaletteHeader
        palette={palette}
        format={format}
        onFormatChange={setFormat}
        onShuffle={randomize}
      />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {palette.map((swatch, i) => (
          <li key={i}>
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
