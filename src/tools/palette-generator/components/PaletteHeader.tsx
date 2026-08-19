import { Shuffle } from "lucide-react";
import Select from "../../../components/Select";
import { tools } from "../../../data/tools";
import { COMBINATION_OPTIONS } from "../combinations";
import type { Combination } from "../combinations";
import { formatColor } from "../format";
import type { ColorFormat } from "../format";
import type { PaletteSwatch } from "../usePalette";
import CopyButton from "./CopyButton";
import FormatToggle from "./FormatToggle";

const accent = tools.find((tool) => tool.name === "Palette generator")?.color;

function PaletteHeader({
  palette,
  format,
  combination,
  onFormatChange,
  onCombinationChange,
  onShuffle,
}: {
  palette: PaletteSwatch[];
  format: ColorFormat;
  combination: Combination;
  onFormatChange: (format: ColorFormat) => void;
  onCombinationChange: (combination: Combination) => void;
  onShuffle: () => void;
}) {
  const cssVariables = palette
    .map((swatch, i) => `--color-${i + 1}: ${formatColor(swatch.rgb, format)};`)
    .join("\n");

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-display text-3xl font-bold">
        <span className="rounded-sm px-2" style={{ backgroundColor: accent }}>
          Palette generator
        </span>
      </h1>
      <div className="flex flex-wrap items-start gap-3">
        <CopyButton text={cssVariables} label="Copy CSS variables" />
        <FormatToggle value={format} onChange={onFormatChange} />
        <Select
          label="Color combination"
          value={combination}
          options={COMBINATION_OPTIONS}
          onChange={onCombinationChange}
          className="w-44"
        />
        <div className="space-y-2">
          <button
            type="button"
            onClick={onShuffle}
            aria-keyshortcuts="Space"
            className="inline-flex w-full items-center justify-center gap-2 rounded-card border-2 border-ink bg-brand p-2 text-sm font-bold text-ink transition hover:brightness-95"
          >
            <Shuffle aria-hidden="true" size={16} strokeWidth={2.5} />
            Shuffle
          </button>
          <p className="text-sm text-ink/60">
            or press{" "}
            <kbd className="rounded border border-ink/30 bg-line/50 px-1 py-0.5 font-mono text-xs">
              Space
            </kbd>{" "}
            to shuffle
          </p>
        </div>
      </div>
    </header>
  );
}

export default PaletteHeader;
