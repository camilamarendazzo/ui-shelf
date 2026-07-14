import { formatHex, parseHex } from "../../../lib/color";
import type { Rgb } from "../../../lib/color";

interface Suggestion {
  hex: string;
  onApply: () => void;
}

function ColorField({
  id,
  label,
  text,
  rgb,
  onChange,
  suggestion,
}: {
  id: string;
  label: string;
  text: string;
  rgb: Rgb;
  onChange: (text: string) => void;
  suggestion?: Suggestion;
}) {
  const invalid = parseHex(text) === null;
  const hintId = `${id}-hint`;
  const hasHint = invalid || suggestion !== undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <div className="flex w-fit items-center overflow-hidden rounded-card border-2 border-ink bg-paper focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-deep">
        <input
          type="color"
          value={formatHex(rgb)}
          onChange={(event) => onChange(event.target.value)}
          aria-label={`${label} picker`}
          className="h-12 w-12 shrink-0 cursor-pointer border-r-2 border-ink p-0 focus-visible:outline-none [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0"
        />
        <input
          id={id}
          type="text"
          value={text}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={invalid || undefined}
          aria-describedby={hasHint ? hintId : undefined}
          className="w-32 bg-transparent px-3 py-2 font-mono focus-visible:outline-none"
        />
      </div>
      <p id={hintId} className="min-h-5" aria-live="polite">
        {invalid ? (
          <span className="text-xs text-error">Enter 3 or 6 hex digits</span>
        ) : suggestion ? (
          <span className="inline-flex items-center gap-1 text-xs text-ink">
            Try{" "}
            <span
              aria-hidden="true"
              style={{ backgroundColor: suggestion.hex }}
              className="inline-block size-3 rounded-full border border-ink/40"
            />{" "}
            <span className="font-mono">{suggestion.hex}</span>
            {" · "}
            <button
              type="button"
              onClick={suggestion.onApply}
              aria-label={`Apply ${suggestion.hex} to ${label}`}
              className="underline hover:no-underline"
            >
              Apply
            </button>
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default ColorField;
