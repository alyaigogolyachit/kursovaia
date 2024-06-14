"use client"
import { HiBars3 } from "react-icons/hi2"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Link from "next/link"

type PoppingMenuProps = {
  status: string
  isLogoutModalOpen: boolean
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  logoutHandler: () => void
}
function PoppingMenu({
  status,
  isLogoutModalOpen,
  setIsLogoutModalOpen,
  logoutHandler,
}: PoppingMenuProps) {
  return (
    <Menu as="div" className=" z-10">
      <Menu.Button className="absolute -translate-y-2/4 rounded-md bg-black/50 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        <HiBars3 size={30}></HiBars3>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-full left-0 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-2 ring-black/5">
          {status === "unauthenticated" && (
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/Login"
                    className={`${
                      active ? "bg-sky-800 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Login
                  </Link>
                )}
              </Menu.Item>
            </div>
          )}
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/Profile"
                  className={`${
                    active ? "bg-sky-800 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/Friends"
                  className={`${
                    active ? "bg-sky-800 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Friends
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/Create"
                  className={`${
                    active ? "bg-sky-800 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Create
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/Contacts"
                  className={`${
                    active ? "bg-sky-800 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Contacts
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/About"
                  className={`${
                    active ? "bg-sky-800 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  About
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            {status === "authenticated" && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      logoutHandler()
                    }}
                    className={`${
                      active ? "bg-sky-800 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default PoppingMenu
