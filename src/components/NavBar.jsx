import React from "react";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-primary">
            GuruEstates
          </span>
        </Link>
        <div className="hidden items-center gap-2 rounded-md border bg-white/70 px-3 py-2 text-sm text-muted-foreground shadow-sm sm:flex">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Find, list, and manage homes
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
