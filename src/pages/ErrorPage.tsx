function ErrorPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold sm:text-6xl">
        [ The shelf is broken ]
      </h1>

      <div aria-hidden="true" className="relative mt-10 h-28 w-full max-w-2xl">
        <div className="absolute top-0 left-0 h-10 w-[48%] origin-left rotate-6 rounded-l-xl bg-ink" />
        <div className="absolute top-4 right-0 h-10 w-[48%] origin-right -rotate-6 rounded-r-xl bg-ink" />
      </div>

      <p className="mt-10 max-w-prose text-lg">
        An unexpected error broke this page. Reloading usually puts everything
        back in place.
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-14 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-3 text-xl font-bold text-ink"
      >
        <span aria-hidden="true">↻</span> reload
      </button>
      <a href="/" className="mt-6 font-bold underline underline-offset-4">
        <span aria-hidden="true">←</span> back
      </a>
    </main>
  );
}

export default ErrorPage;
