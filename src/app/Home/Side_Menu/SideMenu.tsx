import Link from "next/link"
import MostPopular from "./MostPopular"
function SideMenu() {
  return (
    <div className="hidden basis-2/6 my-14 md:block">
      <MostPopular />
      <div className="flex gap-6 justify-between mb-2">
        <h2 className="theme hidden text-red-700 font-bold theme bg-neutral-200 mb-6 2xl:block">
          Chosen by the editor
        </h2>
        <h2 className="theme hidden text-red-700  font-bold theme bg-neutral-200 mb-6 xl:block">
          Chosen by the editor
        </h2>
        <h2 className="theme text-red-700  font-bold theme bg-neutral-200 mb-6">
          Chosen by the editor
        </h2>
      </div>
      <div>
        <h1 className=" header text-xl">Editors Pick</h1>
        <div className="flex flex-col gap-9 mt-8 my-14">
          <Link href="/" className="flex items-center gap-5 border-b-2">
            <div className=" basis-4/5 flex flex-col gap-1 ">
              <span className="theme bg-neutral-100">Gardening</span>
              <h3 className=" text-sm font-medium text-stone-200">
                Laudantium doloribus dicta dolore officiis facere debitis ipsam
                est?
              </h3>
              <div className="text-xs">
                <span className="text-stone-200">Name By</span>
                <span className="text-stone-400"> - 10.12.24</span>
              </div>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-5 border-b-2">
            <div className=" basis-4/5 flex flex-col gap-1 ">
              <span className="theme bg-neutral-100">Flowers</span>
              <h3 className=" text-sm font-medium text-stone-200">
                Laudantium doloribus dicta dolore officiis facere debitis ipsam
                est?
              </h3>
              <div className="text-xs">
                <span className="text-stone-200">Name By</span>
                <span className="text-stone-400"> - 10.12.24</span>
              </div>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-5  border-b-2">
            <div className=" basis-4/5 flex flex-col gap-1 ">
              <span className="theme bg-neutral-100">Mushrooms</span>
              <h3 className=" text-sm font-medium text-stone-200">
                Laudantium doloribus dicta dolore officiis facere debitis ipsam
                est?
              </h3>
              <div className="text-xs">
                <span className="text-stone-200">Name By</span>
                <span className="text-stone-400"> - 10.12.24</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
