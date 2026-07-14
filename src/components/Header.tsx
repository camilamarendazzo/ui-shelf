import { Link, useLocation } from "react-router";
import logo from "../assets/logo.png";

function Header() {
  const isHome = useLocation().pathname === "/";

  return (
    <header
      className={isHome ? "bg-brand" : "border-b border-line bg-paper"}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-4">
        <Link
          to="/"
          className={`flex items-center gap-3 ${isHome ? "focus-visible:outline-ink" : ""}`}
        >
          <img src={logo} alt="" width="36" height="36" />
          <span className="font-display text-xl font-bold">The UI Shelf</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
