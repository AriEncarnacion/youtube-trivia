import React from "react"
import Link from "next/link"
import ModeToggle from "./ModeToggle"
import { Button } from "./ui/button"

const NavBar: React.FC = () => {
  return (
    <nav className="bg-neutral-200 dark:bg-zinc-900 px-7 py-3">
      <div className="grid grid-cols-5">
        <div className="place-content-center col-span-3">
          <Link href="/">
            <span className="hover:bg-zinc-500 hover:text-white dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 p-3 mr-3 rounded">
              Home
            </span>
          </Link>

          <Link href="/quiz">
            <span className="hover:bg-zinc-500 hover:text-white dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 p-3 ml-3 rounded">
              Quiz
            </span>
          </Link>
        </div>
        <div className="col-start-5 flex mr-3 justify-end">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
