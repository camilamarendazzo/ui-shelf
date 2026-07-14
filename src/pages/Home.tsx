import ToolCard from "../components/ToolCard";
import { tools } from "../data/tools";

function Home() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8 space-y-16">
      <h1 className="font-display text-2xl font-bold sm:text-4xl">
        Pick what you need and{" "}
        <span className="inline-block rounded-sm bg-brand px-2">
          take it from the shelf!
        </span>
      </h1>

      <div className="space-y-8">
        <ul className="grid gap-8 sm:grid-cols-2 sm:px-6">
          {tools.map((tool) => (
            <li key={tool.name}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="h-6 rounded-md bg-ink" />
      </div>
    </section>
  );
}

export default Home;
