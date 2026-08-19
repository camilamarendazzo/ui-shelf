import { useEffect, useRef } from "react";

// Re-rolls on Space but only when focus isn't on a control
export function useShuffleShortcut(onShuffle: () => void) {
  const onShuffleRef = useRef(onShuffle);
  onShuffleRef.current = onShuffle;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target?.closest("button, input, textarea, select, a, [contenteditable]")
      ) {
        return;
      }
      event.preventDefault();
      onShuffleRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
