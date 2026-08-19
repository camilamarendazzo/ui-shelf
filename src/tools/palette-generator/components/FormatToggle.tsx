import { FORMATS } from "../format";
import type { ColorFormat } from "../format";

function FormatToggle({
  value,
  onChange,
}: {
  value: ColorFormat;
  onChange: (format: ColorFormat) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Color format"
      className="inline-flex divide-x-2 divide-ink overflow-hidden rounded-card border-2 border-ink"
    >
      {FORMATS.map((format) => {
        const active = format === value;
        return (
          <button
            key={format}
            type="button"
            onClick={() => onChange(format)}
            aria-pressed={active}
            className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition ${
              active ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-line"
            }`}
          >
            {format}
          </button>
        );
      })}
    </div>
  );
}

export default FormatToggle;
