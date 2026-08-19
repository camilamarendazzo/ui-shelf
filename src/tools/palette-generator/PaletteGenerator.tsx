import { Shuffle } from "lucide-react";
import { useState } from "react";
import { tools } from "../../data/tools";
import CopyButton from "./components/CopyButton";
import FormatToggle from "./components/FormatToggle";
import Swatch from "./components/Swatch";
import { formatColor } from "./format";
import type { ColorFormat } from "./format";
import { usePalette } from "./usePalette";

const accent = tools.find((tool) => tool.name === "Palette generator")?.color;

function PaletteGenerator() {
  const { palette, randomize, toggleLock, setColor } = usePalette();
  const [format, setFormat] = useState<ColorFormat>("hex");

  const cssVariables = palette
    .map((swatch, i) => `--color-${i + 1}: ${formatColor(swatch.rgb, format)};`)
    .join("\n");

  return (
    <section className="space-y-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">
          <span className="rounded-sm px-2" style={{ backgroundColor: accent }}>
            Palette generator
          </span>
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton text={cssVariables} label="Copy CSS variables" />
          <FormatToggle value={format} onChange={setFormat} />
          <button
            type="button"
            onClick={randomize}
            className="inline-flex items-center gap-2 rounded-card border-2 border-ink bg-brand px-4 py-2 text-sm font-bold text-ink transition hover:brightness-95"
          >
            <Shuffle aria-hidden="true" size={16} strokeWidth={2.5} />
            Shuffle
          </button>
        </div>
      </header>

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
