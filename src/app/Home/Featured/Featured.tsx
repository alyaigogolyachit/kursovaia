import Image from "next/image"
import Button from "@/reusable-components/Button"
import { Post } from "@/types/types"
import Link from "next/link"
const getFeaturedPost = async () => {
  const res = await fetch("/api/posts/featured")

  if (!res.ok) {
    throw new Error("Failed")
  }

  return res.json()
}

export default async function Featured() {
  const { posts } = await getFeaturedPost()
  const featurePost: Post = posts[0]

  return (
    <div className="flex flex-col mt-5 pb-5 border-b-4">
      <div className="flex justify-center bg-slate-200 p-1">
        <h1 className=" header inline-block text-violet-100 font-extrabold rounded-lg bg-indigo-950 p-2 outline-4 outline outline-zinc-900">
          Post of the week
        </h1>
      </div>

      <div className="block mt-5 gap-12 md:flex 2xl:mt-8">
        <div className="block h-56 relative lg:h-96 md:flex md:flex-1">
          <Image
            src={featurePost.image ? featurePost.image : "/Homebooks.jfif"}
            alt=""
            className="defImg "
            fill
            priority
          />
        </div>
        <div className="block mt-5 placeholder:gap-5 md:flex md:flex-1 md:flex-col  md:mt-0">
          <h1 className="header">{featurePost.title}</h1>
          <hr />
          <p className=" text-sm mt-1 text-zinc-200 font-normal line-clamp-6 lg:text-xl text-justify">
            {featurePost.description}
          </p>
          <Link className="mt-2 md:mt-auto" href={`/posts/${featurePost.slug}`}>
            <Button
              fullWidth
              className=" bg-cyan-100 px-4 py-5 shadow-lg shadow-cyan-500 text-sm lg:text-lg hover:bg-cyan-200 hover:ring hover:shadow-sm focus:ring focus:ring-inset focus:ring-cyan-700 "
            >
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
