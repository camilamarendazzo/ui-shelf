import { formatHex, relativeLuminance } from "../../../lib/color";
import type { Rgb } from "../../../lib/color";

function Swatch({ rgb }: { rgb: Rgb }) {
  const hex = formatHex(rgb);
  const onLightColor = relativeLuminance(rgb) > 0.2;

  return (
    <div
      className="flex min-h-44 flex-col justify-end rounded-card border-2 border-ink p-4"
      style={{ backgroundColor: hex }}
    >
      <span
        className={`font-mono text-sm font-bold uppercase ${
          onLightColor ? "text-ink" : "text-paper"
        }`}
      >
        {hex}
      </span>
    </div>
  );
}

export default Swatch;
