import Category from "./Home/Category_Slider/CategorySlider"
import RecentPosts from "./Home/Recent_Posts/RecentPosts"
import SideMenu from "./Home/Side_Menu/SideMenu"
import Featured from "./Home/Featured/Featured"

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = parseInt(searchParams.page) || 1

  return (
    <div className="mt-8">
      <h1 className="header text-2xl text-justify text-gray-200 sm:text-2xl md:text-5xl lg:text-7xl">
        <b>Hey!</b> New shared stories are waiting for you to discover!
      </h1>
      <Featured />
      <Category />
      <div className="flex flex-col">
        <h1 className="header my-12">Recent Posts</h1>
        <div className="flex gap-12">
          <RecentPosts page={page} />
          <SideMenu />
        </div>
      </div>
    </div>
  )
}
