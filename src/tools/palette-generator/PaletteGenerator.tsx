import { Shuffle } from "lucide-react";
import { tools } from "../../data/tools";
import Swatch from "./components/Swatch";
import { usePalette } from "./usePalette";

const accent = tools.find((tool) => tool.name === "Palette generator")?.color;

function PaletteGenerator() {
  const { palette, randomize, toggleLock } = usePalette();

  return (
    <section className="space-y-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">
          <span className="rounded-sm px-2" style={{ backgroundColor: accent }}>
            Palette generator
          </span>
        </h1>
        <button
          type="button"
          onClick={randomize}
          className="inline-flex w-fit items-center gap-2 rounded-card border-2 border-ink bg-brand px-5 py-2.5 font-bold text-ink shadow-pop transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
        >
          <Shuffle aria-hidden="true" size={18} strokeWidth={2.5} />
          Shuffle
        </button>
      </header>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {palette.map((swatch, i) => (
          <li key={i}>
            <Swatch
              rgb={swatch.rgb}
              locked={swatch.locked}
              onToggleLock={() => toggleLock(i)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PaletteGenerator;
