import { Vote } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center px-32">
        <Link
          to={"/"}
          className="flex items-center gap-2 font-bold text-xl text-black"
        >
          <Vote className="h-6 w-6" />
          <span>VoteFlow</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
