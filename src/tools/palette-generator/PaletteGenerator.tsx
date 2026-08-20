import { useState } from "react";
import PaletteHeader from "./components/PaletteHeader";
import Swatch from "./components/Swatch";
import type { ColorFormat } from "./format";
import { MAX_SWATCHES, MIN_SWATCHES, usePalette } from "./usePalette";
import { useShuffleShortcut } from "./useShuffleShortcut";

function PaletteGenerator() {
  const {
    palette,
    combination,
    randomize,
    setCombination,
    toggleLock,
    setColor,
    addSwatch,
    removeSwatch,
  } = usePalette();
  const [format, setFormat] = useState<ColorFormat>("hex");
  useShuffleShortcut(randomize);

  const removable = palette.length > MIN_SWATCHES;

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-8">
      <PaletteHeader
        palette={palette}
        format={format}
        combination={combination}
        canAdd={palette.length < MAX_SWATCHES}
        onFormatChange={setFormat}
        onCombinationChange={setCombination}
        onShuffle={randomize}
        onAddColor={addSwatch}
      />

      <ul className="flex min-h-0 flex-1 flex-col sm:flex-row">
        {palette.map((swatch, i) => (
          <li key={i} className="flex min-h-0 min-w-0 flex-1 flex-col">
            <Swatch
              rgb={swatch.rgb}
              locked={swatch.locked}
              format={format}
              removable={removable}
              onToggleLock={() => toggleLock(i)}
              onChange={(rgb) => setColor(i, rgb)}
              onRemove={() => removeSwatch(i)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PaletteGenerator;
