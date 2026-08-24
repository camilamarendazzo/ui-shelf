import { BadgeCheck, Eye, Gauge } from "lucide-react";
import Chip from "@/components/ui/Chip";

function WhyContrastMatters({ accent }: { accent?: string }) {
  return (
    <div id="why-contrast" className="mt-16 scroll-mt-8">
      <h2 className="font-display text-2xl font-bold">
        Why does contrast{" "}
        <span className="rounded-sm px-2" style={{ backgroundColor: accent }}>
          matter?
        </span>
      </h2>
      <div className="mt-6 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-card border-2 border-line bg-gold-soft/40 p-6">
          <Eye aria-hidden="true" size={28} strokeWidth={2.5} />
          <h3 className="mt-3 font-display text-lg font-bold">
            Readable for everyone
          </h3>
          <p className="mt-2">
            Text is only useful if people can read it. When text and its
            background are too close in color, reading becomes hard, on a phone
            in sunlight, on a cheap screen, and especially for people with low
            vision or color blindness. Good contrast helps everyone, not just a
            few.
          </p>
        </div>
        <div className="rounded-card border-2 border-line bg-line/30 p-6">
          <Gauge aria-hidden="true" size={28} strokeWidth={2.5} />
          <h3 className="mt-3 font-display text-lg font-bold">
            What the number means
          </h3>
          <p className="mt-2">
            The contrast ratio compares how bright two colors are. It goes from{" "}
            <Chip>1:1</Chip> (the same color twice) to <Chip>21:1</Chip>
            (black on white). The higher the number, the easier the combination
            is to read. This tool calculates it the same way accessibility
            auditors do.
          </p>
        </div>
        <div className="rounded-card border-2 border-line bg-gold-soft/40 p-6">
          <BadgeCheck aria-hidden="true" size={28} strokeWidth={2.5} />
          <h3 className="mt-3 font-display text-lg font-bold">
            What AA and AAA mean
          </h3>
          <p className="mt-2">
            The{" "}
            <a
              href="https://www.w3.org/WAI/standards-guidelines/wcag/"
              className="font-bold text-brand-deep underline underline-offset-4"
            >
              WCAG guidelines
            </a>{" "}
            define two levels. AA is the standard most sites aim for: at least
            4.5:1 for normal text. AAA is stricter (7:1) and ideal for body text
            you read for a long time. Large text, roughly 24px, or 19px bold is
            easier to read, so it only needs 3:1 for AA.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyContrastMatters;
