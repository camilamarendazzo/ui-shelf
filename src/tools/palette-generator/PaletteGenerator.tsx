import { tools } from "../../data/tools";
import Swatch from "./components/Swatch";
import { usePalette } from "./usePalette";

const accent = tools.find((tool) => tool.name === "Palette generator")?.color;

function PaletteGenerator() {
  const { palette } = usePalette();

  return (
    <section className="space-y-12">
      <header>
        <h1 className="font-display text-3xl font-bold">
          <span className="rounded-sm px-2" style={{ backgroundColor: accent }}>
            Palette generator
          </span>
        </h1>
      </header>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {palette.map((swatch, i) => (
          <li key={i}>
            <Swatch rgb={swatch.rgb} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PaletteGenerator;
