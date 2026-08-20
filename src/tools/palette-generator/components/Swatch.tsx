import { Check, Copy, Lock, Unlock, X } from "lucide-react";
import { formatHex, parseHex } from "../../../lib/color";
import type { Rgb } from "../../../lib/color";
import { relativeLuminance } from "../../../lib/contrast";
import { formatColor } from "../format";
import type { ColorFormat } from "../format";
import { useCopy } from "../useCopy";

function Swatch({
  rgb,
  locked,
  format,
  removable,
  onToggleLock,
  onChange,
  onRemove,
}: {
  rgb: Rgb;
  locked: boolean;
  format: ColorFormat;
  removable: boolean;
  onToggleLock: () => void;
  onChange: (rgb: Rgb) => void;
  onRemove: () => void;
}) {
  const hex = formatHex(rgb);
  const value = formatColor(rgb, format);
  const onLightColor = relativeLuminance(rgb) > 0.2;
  const textColor = onLightColor ? "text-ink" : "text-paper";
  const LockIcon = locked ? Lock : Unlock;

  const { copied, copy } = useCopy();

  const iconButton =
    "rounded-full p-2 transition hover:bg-ink/10 focus-visible:bg-ink/10";

  return (
    <div
      className={`group/swatch flex flex-1 items-center justify-between gap-2 p-3 sm:flex-col sm:items-stretch sm:justify-between sm:p-4 ${textColor}`}
      style={{ backgroundColor: hex }}
    >
      <div className="flex items-center justify-end opacity-100 sm:opacity-0 sm:group-hover/swatch:opacity-100 sm:group-focus-within/swatch:opacity-100">
        <button
          type="button"
          onClick={() => copy(value)}
          aria-label={`Copy ${value}`}
          className={iconButton}
        >
          {copied ? (
            <Check aria-hidden="true" size={18} strokeWidth={2.5} />
          ) : (
            <Copy aria-hidden="true" size={18} strokeWidth={2.5} />
          )}
        </button>
        <button
          type="button"
          onClick={onToggleLock}
          aria-pressed={locked}
          aria-label={`Lock ${hex}`}
          className={iconButton}
        >
          <LockIcon aria-hidden="true" size={18} strokeWidth={2.5} />
        </button>
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${hex}`}
            className={iconButton}
          >
            <X aria-hidden="true" size={18} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <label className="group/value w-fit cursor-pointer rounded-sm px-2 hover:bg-ink/10 focus-within:bg-ink/10 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-current">
        <span className="font-mono text-sm font-bold uppercase group-hover/value:underline">
          {value}
        </span>
        <input
          type="color"
          value={hex}
          onChange={(event) => onChange(parseHex(event.target.value)!)}
          aria-label={`Change color, currently ${value}`}
          className="sr-only"
        />
      </label>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `Copied ${value}` : ""}
      </span>
    </div>
  );
}

export default Swatch;
