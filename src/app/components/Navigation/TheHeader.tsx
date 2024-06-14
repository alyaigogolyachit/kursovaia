"use client"

import Link from "next/link"
import SearchBar from "./SearchBar"
import PoppingMenu from "./PoppingMenu"
import LogoutModal from "./Logout"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useState } from "react"

type NavItemsProps = {
  label: string
  href: string
  hide?: boolean
  needAuth?: boolean
}
const firstNavItems: NavItemsProps[] = [
  {
    label: "Profile",
    href: "/Profile",
  },
  {
    label: "Friends",
    href: "/Friends",
  },
  {
    label: "Contacts",
    href: "/Contacts",
  },
  {
    label: "About",
    href: "/About",
    hide: true,
  },
]

const TheHeader = () => {
  const { status } = useSession()

  const pathname = usePathname()

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  function logoutHandler() {
    setIsLogoutModalOpen(true)
  }

  return (
    <header className="relative z-1000 bg-slate-900 h-[72px] text-slate-50 ">
      <nav className=" h-full flex gap-2 justify-around md:gap-4 md:justify-between items-center mx-5 lg:mx-10 xl:mx-20 lg:gap-8">
        <div className="flex mr-3 w-6 md:hidden ">
          <PoppingMenu
            status={status}
            isLogoutModalOpen={isLogoutModalOpen}
            setIsLogoutModalOpen={setIsLogoutModalOpen}
            logoutHandler={logoutHandler}
          />
        </div>
        <div className="hidden gap-0 md:flex xl:flex-1 shrink  lg:justify-start lg:gap-2 text-sm lg:text-base">
          {firstNavItems.map((link) => {
            const isActive: boolean = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`hover:text-slate-300 px-2 lg:px-4 py-2 ${isActive ? "bg-slate-800 rounded-md border border-none" : " "}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
        <div className="relative inline-flex shrink-0 items-center justify-start  w-[50px] md:h-6 md:w-[70px]">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Home"
              className={` bottom-0 shrink-0 translate-y-6 w-full cursor-pointer absolute   ${pathname === "/" ? "p-1 rounded-2xl shadow-xl  bg-cyan-100" : " hover:border hover:border-double hover:rounded-full hover:border-emerald-100"}`}
            />
          </Link>
        </div>
        <div className=" w-full md:flex justify-start  lg:flex-1 text-sm lg:text-base gap-4 lg:gap-8">
          <div className="flex h-6/6 ml-0 md:basis-5/6 ">
            <SearchBar />
          </div>
          <div className="hidden md:flex gap-0 lg:gap-4 ">
            {status === "unauthenticated" ? (
              <Link
                href="/Login"
                className={` px-2 lg:px-4 py-2 hover:text-slate-300 ${pathname === "/Login" ? "bg-slate-800 rounded-md border border-none" : " "}`}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href="/Create"
                  className={`hidden px-2 lg:px-4 py-2 hover:text-slate-300 md:flex ${pathname === "/Create" ? "bg-slate-800 rounded-md border border-none" : " "}`}
                >
                  Create
                </Link>
                <Link
                  href=""
                  onClick={logoutHandler}
                  className="cursor-pointer px-2 lg:px-4 py-2 hover:text-slate-300"
                >
                  Logout
                </Link>
                {isLogoutModalOpen && (
                  <LogoutModal
                    isLogoutModalOpen={isLogoutModalOpen}
                    setIsLogoutModalOpen={setIsLogoutModalOpen}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
export default TheHeader
