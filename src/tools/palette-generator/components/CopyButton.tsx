import { Check, Copy } from "lucide-react";
import { useCopy } from "../useCopy";

function CopyButton({ text, label }: { text: string; label: string }) {
  const { copied, copy } = useCopy();
  const Icon = copied ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={() => copy(text)}
        aria-label={label}
        className="inline-flex items-center gap-2 rounded-card border-2 border-ink bg-paper px-4 py-2 text-sm font-bold text-ink transition hover:bg-line focus-visible:bg-line"
      >
        <Icon aria-hidden="true" size={16} strokeWidth={2.5} />
        {copied ? "Copied" : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copied` : ""}
      </span>
    </>
  );
}

export default CopyButton;
