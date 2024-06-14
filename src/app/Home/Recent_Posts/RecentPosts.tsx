import RecentPost from "@/app/components/Recent_Post/Recent_Post"
import Pagination from "../Pagination/Pagination"
import { Post } from "@/types/types"

const getData = async (page: number, cat: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    },
  )

  if (!res.ok) {
    throw new Error("Failed")
  }

  return res.json()
}

export default async function RecentPosts({
  page,
  cat,
}: {
  page: number
  cat?: string
}) {
  const { posts, count } = await getData(page, cat || "")

  const POST_PER_PAGE = 3

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className="md:basis-5/6 w-full">
      <div>
        {posts?.map((item: Post) => <RecentPost item={item} key={item.id} />)}
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    </div>
  )
}
