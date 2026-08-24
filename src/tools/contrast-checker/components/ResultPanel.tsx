import { CircleHelp } from "lucide-react";
import Chip from "@/components/ui/Chip";
import { formatRatio } from "@/lib/contrast";
import { levels } from "../levels";

function ResultPanel({ ratio }: { ratio: number }) {
  const passCount = levels.filter((level) => ratio >= level.threshold).length;

  return (
    <div className="flex-1 rounded-card border-2 border-ink p-8">
      <div className="flex items-start justify-between gap-4">
        <p role="status" className="font-mono text-5xl font-bold">
          {formatRatio(ratio)}
          <span className="sr-only">
            {" "}
            - {passCount} of {levels.length} levels pass
          </span>
        </p>
        <a
          href="#why-contrast"
          title="What do these results mean?"
          className="rounded-full"
        >
          <CircleHelp aria-hidden="true" />
          <span className="sr-only">What do these results mean?</span>
        </a>
      </div>
      <ul className="mt-4 grid w-fit gap-2 sm:grid-cols-2">
        {levels.map(({ label, threshold }) => {
          const pass = ratio >= threshold;
          return (
            <li key={label}>
              <Chip color={pass ? "success" : "error"}>
                {label} {formatRatio(threshold)} · {pass ? "Pass" : "Fail"}
              </Chip>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ResultPanel;
