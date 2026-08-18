import { Lock, Unlock } from "lucide-react";
import { formatHex, relativeLuminance } from "../../../lib/color";
import type { Rgb } from "../../../lib/color";

function Swatch({
  rgb,
  locked,
  onToggleLock,
}: {
  rgb: Rgb;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const hex = formatHex(rgb);
  const onLightColor = relativeLuminance(rgb) > 0.2;
  const contentColor = onLightColor ? "text-ink" : "text-paper";
  const LockIcon = locked ? Lock : Unlock;

  return (
    <div
      className="flex min-h-44 flex-col justify-between rounded-card border-2 border-ink p-4"
      style={{ backgroundColor: hex }}
    >
      <button
        type="button"
        onClick={onToggleLock}
        aria-pressed={locked}
        aria-label={`Lock ${hex}`}
        className={`self-end rounded-full p-2 transition hover:bg-ink/10 focus-visible:bg-ink/10 ${contentColor}`}
      >
        <LockIcon aria-hidden="true" size={18} strokeWidth={2.5} />
      </button>
      <span className={`font-mono text-sm font-bold uppercase ${contentColor}`}>
        {hex}
      </span>
    </div>
  );
}

export default Swatch;
