import { useState } from "react";
import { useSearchParams } from "react-router";
import { formatHex, parseHex } from "@/lib/color";
import type { Rgb } from "@/lib/color";

const DEFAULT_C1: Rgb = { r: 31, g: 27, b: 16 };
const DEFAULT_C2: Rgb = { r: 244, g: 195, b: 9 };

export interface ColorState {
  text: string;
  rgb: Rgb;
}

function initColor(param: string | null, fallback: Rgb): ColorState {
  const rgb = parseHex(param ?? "") ?? fallback;
  return { text: formatHex(rgb), rgb };
}

// Two colors, each holding the raw field text plus the last valid parsed
// color, initialized from and mirrored to the ?c1=&c2= URL params so results
// are shareable.
export function useColorPair() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [c1, setC1] = useState(() =>
    initColor(searchParams.get("c1"), DEFAULT_C1),
  );
  const [c2, setC2] = useState(() =>
    initColor(searchParams.get("c2"), DEFAULT_C2),
  );

  const update =
    (key: "c1" | "c2", setState: typeof setC1) => (text: string) => {
      const rgb = parseHex(text);
      setState((prev) => ({ text, rgb: rgb ?? prev.rgb }));
      if (rgb) {
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            next.set(key, formatHex(rgb).slice(1));
            return next;
          },
          { replace: true },
        );
      }
    };

  return {
    c1,
    c2,
    updateC1: update("c1", setC1),
    updateC2: update("c2", setC2),
  };
}
