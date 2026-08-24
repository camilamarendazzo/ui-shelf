import { formatHex } from "@/lib/color";
import type { Rgb } from "@/lib/color";

function Showcase({
  caption,
  background,
  foreground,
}: {
  caption: string;
  background: Rgb;
  foreground: Rgb;
}) {
  const fgHex = formatHex(foreground);

  return (
    <div className="flex flex-col">
      <p className="font-mono text-xs font-bold tracking-widest text-ink/70 uppercase">
        {caption}
      </p>
      <div
        aria-hidden="true"
        className="mt-2 flex min-h-44 flex-1 flex-col justify-center gap-2 rounded-card border-2 border-ink p-6"
        style={{ backgroundColor: formatHex(background), color: fgHex }}
      >
        <div
          className="h-8 w-8 rounded-full"
          style={{ backgroundColor: fgHex }}
        />
        <p>Normal text: grab a tool off the shelf.</p>
        <p className="text-2xl font-bold">Large text</p>
      </div>
    </div>
  );
}

export default Showcase;
