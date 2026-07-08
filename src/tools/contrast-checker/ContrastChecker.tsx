import { useEffect } from "react";
import { tools } from "../../data/tools";
import { contrastRatio } from "../../lib/color";
import ColorField from "./components/ColorField";
import ResultPanel from "./components/ResultPanel";
import Showcase from "./components/Showcase";
import WhyContrastMatters from "./components/WhyContrastMatters";
import { useColorPair } from "./useColorPair";

const accent = tools.find((tool) => tool.name === "Contrast checker")?.color;

function ContrastChecker() {
  const { c1, c2, updateC1, updateC2 } = useColorPair();
  const ratio = contrastRatio(c1.rgb, c2.rgb);

  useEffect(() => {
    document.title = "Contrast checker. The UI Shelf.";
  }, []);

  return (
    <section className="space-y-12 py-4">
      <header>
        <h1 className="font-display text-3xl font-bold">
          <span className="rounded-sm px-2" style={{ backgroundColor: accent }}>
            Contrast checker
          </span>
        </h1>
        <p className="mt-3 max-w-prose">
          Check two colors against the WCAG contrast levels. The colors are
          saved in the URL, so you can share the result.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-col gap-6">
          <div className="rounded-card border-2 border-line bg-line/30 p-6">
            <div className="flex flex-wrap gap-x-8">
              <ColorField
                id="c1"
                label="Color 1"
                text={c1.text}
                rgb={c1.rgb}
                onChange={updateC1}
              />
              <ColorField
                id="c2"
                label="Color 2"
                text={c2.text}
                rgb={c2.rgb}
                onChange={updateC2}
              />
            </div>
          </div>

          <ResultPanel ratio={ratio} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Showcase
            caption="Color 2 on color 1"
            background={c1.rgb}
            foreground={c2.rgb}
          />
          <Showcase
            caption="Color 1 on color 2"
            background={c2.rgb}
            foreground={c1.rgb}
          />
        </div>
      </div>

      <WhyContrastMatters accent={accent} />
    </section>
  );
}

export default ContrastChecker;
