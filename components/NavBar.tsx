import React from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { BookOpenCheck, Home, Youtube } from "lucide-react";
import NavBarMenu from "./NavBarMenu";

const NavBar: React.FC = () => {
  const h1Style =
    "transition-all text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold align-self-center";
  return (
    <nav
      className="
    bg-gradient-to-r
    from-slate-200
    via-blue-100
    to-slate-200 
    dark:from-slate-950
    dark:via-blue-950
    dark:to-slate-950

    dark:border-black
    px-5 
    py-3"
    >
      <div className="flex justify-between">
        <div>
          <NavBarMenu />
        </div>

        <div className="flex">
          <h1 className={h1Style}>Youtube</h1>
          <Youtube className="size-4 md:size-6 lg:size-8" />
          <h1 className={h1Style}>Trivia</h1>
          <BookOpenCheck className="size-4 md:size-6 lg:size-8" />
        </div>

        <div className="">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
