import { Link } from "react-router";
import type { Tool } from "../data/tools";
import Chip from "./Chip";

function ToolCard({ tool }: { tool: Tool }) {
  const cardClasses =
    "min-w-2xs max-w-md flex h-full flex-col gap-3 rounded-card border-2 border-ink p-6 shadow-pop";
  const cardStyle = { backgroundColor: tool.color };
  const Icon = tool.icon;

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <Icon aria-hidden="true" strokeWidth={2.5} />
        {tool.comingSoon && <Chip>Soon</Chip>}
      </div>
      <h2 className="mt-2 font-display text-2xl font-bold">
        {tool.name}
        {!tool.comingSoon && tool.route && <span aria-hidden="true"> →</span>}
      </h2>
      <p>{tool.description}</p>
    </>
  );

  if (tool.route && !tool.comingSoon) {
    return (
      <Link
        to={tool.route}
        style={cardStyle}
        className={`${cardClasses} transition-transform hover:-translate-y-1.5 hover:rotate-0`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div style={cardStyle} className={cardClasses}>
      {content}
    </div>
  );
}

export default ToolCard;
