import React from "react"
import ModeToggle from "./ModeToggle"
import { Button } from "./ui/button"
import { Home } from "lucide-react"
import NavBarMenu from "./NavBarMenu"

const NavBar: React.FC = () => {
  return (
    <nav className="bg-slate-200 dark:bg-slate-950 px-5 py-3">
      <div className="grid grid-cols-5">
        <div>
          <NavBarMenu />
        </div>

        <div className="col-start-5 flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
