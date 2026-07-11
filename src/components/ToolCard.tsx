import type { CSSProperties } from "react";
import { Link } from "react-router";
import type { Tool } from "../data/tools";
import Chip from "./Chip";

function ToolCard({ tool }: { tool: Tool }) {
  const cardClasses =
    "min-w-2xs max-w-md flex h-full flex-col gap-3 rounded-card border-2 p-6";
  const cardStyle = { "--tool-color": tool.color } as CSSProperties;
  const Icon = tool.icon;

  const content = (
    <>
      <div className="flex items-start justify-between gap-2 text-ink">
        <Icon aria-hidden="true" strokeWidth={2.5} fill="var(--tool-color)" />
        {tool.comingSoon && <Chip>Soon</Chip>}
      </div>
      <h2 className="mt-2 font-display text-2xl font-bold text-ink">
        {tool.name}
        {!tool.comingSoon && <span aria-hidden="true"> →</span>}
      </h2>
      <p>{tool.description}</p>
    </>
  );

  if (tool.comingSoon) {
    return (
      <div
        style={cardStyle}
        className={`${cardClasses} border-dashed border-ink/40 text-ink/70`}
      >
        {content}
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
