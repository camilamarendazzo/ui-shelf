import ToolCard from "../components/ToolCard";
import { tools } from "../data/tools";

function Home() {
  return (
    <section className="py-8 space-y-16">
      <h1 className="font-display text-lg font-bold sm:text-4xl">
        Pick what you need and{" "}
        <span className="rounded-sm bg-brand px-2">
          take it from the shelf!
        </span>
      </h1>

      <div className="space-y-8">
        <ul className="flex flex-wrap gap-8 px-6">
          {tools.map((tool) => (
            <li key={tool.name}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="h-4 rounded-full bg-ink" />
      </div>
    </section>
  );
}

export default Home;
