import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { Link } from "react-router";
import type { Tool } from "../data/tools";

function ToolCard({ tool }: { tool: Tool }) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const cardClasses =
    "min-w-2xs max-w-md flex h-full flex-col gap-3 rounded-card border-2 p-6";
  const cardStyle = { "--tool-color": tool.color } as CSSProperties;
  const Icon = tool.icon;

  const content = (
    <>
      <div className="flex items-start justify-between gap-2 text-ink">
        <Icon aria-hidden="true" strokeWidth={2.5} fill="var(--tool-color)" />
      </div>
      <h2 className="mt-2 font-display text-2xl font-bold text-ink">
        {tool.name}
        {tool.comingSoon ? (
          <span className="sr-only"> (coming soon)</span>
        ) : (
          <span aria-hidden="true"> →</span>
        )}
      </h2>
      <p>{tool.description}</p>
    </>
  );

  if (tool.comingSoon) {
    const trackCursor = (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };

    return (
      <div
        style={cardStyle}
        onPointerMove={trackCursor}
        onPointerLeave={() => setCursor(null)}
        className={`${cardClasses} relative cursor-none border-dashed border-ink/40 text-ink/70`}
      >
        {content}
        {cursor && (
          <span
            aria-hidden="true"
            style={{
              left: cursor.x,
              top: cursor.y,
              backgroundColor: "var(--tool-color)",
            }}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest text-ink uppercase"
          >
            Soon
          </span>
        )}
      </div>
    );
  }

  return (
    <Link
      to={tool.route ?? "/"}
      style={cardStyle}
      className={`${cardClasses} border-ink shadow-pop transition hover:-translate-y-1.5 hover:bg-(--tool-color) focus-visible:-translate-y-1.5 focus-visible:bg-(--tool-color)`}
    >
      {content}
    </Link>
  );
}

export default ToolCard;
