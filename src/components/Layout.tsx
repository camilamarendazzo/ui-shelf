import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 focus:rounded-card focus:bg-ink focus:px-4 focus:py-2 focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <main
        id="main"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-12"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
