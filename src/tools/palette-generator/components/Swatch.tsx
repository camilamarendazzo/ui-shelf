import { Check, Copy, Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import { formatHex, parseHex } from "../../../lib/color";
import type { Rgb } from "../../../lib/color";
import { relativeLuminance } from "../../../lib/contrast";
import { formatColor } from "../format";
import type { ColorFormat } from "../format";

function Swatch({
  rgb,
  locked,
  format,
  onToggleLock,
  onChange,
}: {
  rgb: Rgb;
  locked: boolean;
  format: ColorFormat;
  onToggleLock: () => void;
  onChange: (rgb: Rgb) => void;
}) {
  const hex = formatHex(rgb);
  const value = formatColor(rgb, format);
  const onLightColor = relativeLuminance(rgb) > 0.2;
  const textColor = onLightColor ? "text-ink" : "text-paper";
  const LockIcon = locked ? Lock : Unlock;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    navigator.clipboard.writeText(value).then(
      () => setCopied(true),
      () => {}, // clipboard unavailable — ignore
    );
  };

  const iconButton =
    "rounded-full p-2 transition hover:bg-ink/10 focus-visible:bg-ink/10";

  return (
    <div
      className={`flex min-h-44 flex-col justify-between rounded-card border-2 border-ink p-4 ${textColor}`}
      style={{ backgroundColor: hex }}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={copy}
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
      </div>

      <label className="group w-fit cursor-pointer rounded-sm px-2 hover:bg-ink/10 focus-within:bg-ink/10">
        <span className="font-mono text-sm font-bold uppercase group-hover:underline">
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
