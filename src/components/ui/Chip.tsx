import type { CSSProperties, ReactNode } from "react";

function Chip({
  color = "ink",
  className = "",
  children,
}: {
  color?: string;
  className?: string;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    backgroundColor: `color-mix(in srgb, var(--color-${color}) 25%, var(--color-paper))`,
    color: `var(--color-${color})`,
  };

  return (
    <span
      style={style}
      className={`w-fit rounded-full px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest uppercase ${className}`}
    >
      {children}
    </span>
  );
}

export default Chip;
