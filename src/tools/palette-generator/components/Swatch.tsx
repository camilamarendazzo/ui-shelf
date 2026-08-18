import { Lock, Unlock } from "lucide-react";
import { formatHex, parseHex, relativeLuminance } from "../../../lib/color";
import type { Rgb } from "../../../lib/color";

function Swatch({
  rgb,
  locked,
  onToggleLock,
  onChange,
}: {
  rgb: Rgb;
  locked: boolean;
  onToggleLock: () => void;
  onChange: (rgb: Rgb) => void;
}) {
  const hex = formatHex(rgb);
  const onLightColor = relativeLuminance(rgb) > 0.2;
  const textColor = onLightColor ? "text-ink" : "text-paper";
  const LockIcon = locked ? Lock : Unlock;

  return (
    <div
      className={`flex min-h-44 flex-col justify-between rounded-card border-2 border-ink p-4 ${textColor}`}
      style={{ backgroundColor: hex }}
    >
      <button
        type="button"
        onClick={onToggleLock}
        aria-pressed={locked}
        aria-label={`Lock ${hex}`}
        className="self-end rounded-full p-2 transition hover:bg-ink/10 focus-visible:bg-ink/10"
      >
        <LockIcon aria-hidden="true" size={18} strokeWidth={2.5} />
      </button>

      <label className="group w-fit cursor-pointer rounded-sm px-2 hover:bg-ink/10 focus-visible:bg-ink/10">
        <span className="font-mono text-sm font-bold uppercase group-hover:underline">
          {hex}
        </span>
        <input
          type="color"
          value={hex}
          onChange={(event) => onChange(parseHex(event.target.value)!)}
          aria-label={`Change color, currently ${hex}`}
          className="sr-only"
        />
      </label>
    </div>
  );
}

export default Swatch;
