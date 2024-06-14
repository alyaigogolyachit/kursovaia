import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { signOut } from "next-auth/react"

type LogoutModalProps = {
  isLogoutModalOpen: boolean
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogoutModal({
  isLogoutModalOpen,
  setIsLogoutModalOpen,
}: LogoutModalProps) {
  const handleYes = () => {
    setIsLogoutModalOpen(false)
    signOut()
  }
  return (
    <>
      <Transition appear show={isLogoutModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsLogoutModalOpen(false)
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform rounded-2xl bg-teal-100 p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure?
                  </Dialog.Title>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className=" rounded-md border border-transparent bg-teal-300 px-4 py-2 text-sm font-medium text-teal-950 hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsLogoutModalOpen(false)
                      }}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className=" rounded-md border border-transparent bg-teal-300 px-4 py-2 text-sm font-medium text-teal-950 hover:bg-teal-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleYes}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
