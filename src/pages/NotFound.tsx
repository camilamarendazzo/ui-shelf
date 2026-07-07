import { Link } from "react-router";

function NotFound() {
  return (
    <section className="flex flex-col items-center px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold sm:text-6xl">
        [ Nothing on this shelf ]
      </h1>
      <div
        aria-hidden="true"
        className="mt-8 h-10 w-full max-w-2xl rounded-xl bg-ink"
      />
      <Link
        to="/"
        className="mt-14 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-3 text-xl font-bold text-ink"
      >
        <span aria-hidden="true">←</span> back
      </Link>
    </section>
  );
}

export default NotFound;
