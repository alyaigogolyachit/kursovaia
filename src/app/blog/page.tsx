import RecentPosts from "../Home/Recent_Posts/RecentPosts"
import SideMenu from "../Home/Side_Menu/SideMenu"

export default function Blog({
  searchParams,
}: {
  searchParams: { page: string; cat: string }
}) {
  const page = parseInt(searchParams.page) || 1
  const { cat } = searchParams
  return (
    <div className="mt-8 ">
      <div className="flex justify-center bg-slate-200 p-1 ">
        <h1 className=" header inline-block text-violet-100 font-extrabold rounded-lg bg-indigo-950 p-2 outline-4 outline outline-zinc-900">
          Blog {cat}
        </h1>
      </div>
      <div className="flex gap-12 mt-16">
        <RecentPosts page={page} cat={cat} />
        <SideMenu />
      </div>
    </div>
  )
}
