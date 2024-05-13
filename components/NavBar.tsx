import React from "react"
import ModeToggle from "./ModeToggle"
import { Button } from "./ui/button"
import { BookOpenCheck, Home, Youtube } from "lucide-react"
import NavBarMenu from "./NavBarMenu"

const NavBar: React.FC = () => {
  return (
    <nav className="bg-slate-200 dark:bg-slate-950 px-5 py-3">
      <div className="flex justify-between">
        <div>
          <NavBarMenu />
        </div>

        <div className="flex">
          <h1 className="transition-all text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold align-self-center">
            Youtube
          </h1>
          <Youtube className="size-4 md:size-6 lg:size-8" />
          <h1 className="transition-all text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold align-self-center">
            Trivia
          </h1>
          <BookOpenCheck className="size-4 md:size-6 lg:size-8" />
        </div>

        <div className="">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
