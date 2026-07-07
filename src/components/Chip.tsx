import type { ReactNode } from "react";

function Chip({
  color,
  className = "",
  children,
}: {
  color?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      style={color ? { backgroundColor: color } : undefined}
      className={`w-fit rounded-full px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest uppercase ${className}`}
    >
      {children}
    </span>
  );
}

export default Chip;
