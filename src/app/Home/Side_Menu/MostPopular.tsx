import Link from "next/link"
import Image from "next/image"
import { Post } from "@/types/types"
const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/posts?popular=true`)
  if (!res.ok) {
    throw new Error("Failed")
  }

  return res.json()
}

async function MostPopular() {
  const { posts }: { posts: Post[] } = await getData()

  return (
    <>
      <div className="flex gap-6 justify-between ">
        <h2 className="theme  text-red-600 font-bold mb-6 ">What's hot</h2>

        <h2 className=" hidden theme text-red-600 font-bold   mb-6 2xl:block">
          What's hot
        </h2>
        <h2 className=" hidden theme text-red-600 font-bold   mb-6 xl:block">
          What's hot
        </h2>
      </div>
      <div>
        <h1 className="header text-xl">Most Popular</h1>
        <div className="flex flex-col gap-9 my-6  ">
          {posts.map((post: Post) => (
            <div
              className="flex items-center gap-2 pb-3 border-b-2"
              key={post.slug}
            >
              <div className=" basis-1/5 aspect-square relative ">
                <Image
                  src={post?.image ? post.image : "/no_image.png"}
                  alt=""
                  fill
                  className=" rounded-full border-2 object-cover"
                />
              </div>
              <div className=" basis-4/5 grow-0 flex flex-col gap-1 ">
                <div className="flex gap-1 justify-between text-sm ">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:underline w-[130px] break-words line-clamp-1"
                  >
                    {post.title.toUpperCase()}
                  </Link>

                  <Link
                    href={`/blog?cat=${post.categorySlug}`}
                    className="break-words theme p-1 hover:ring hover:ring-inset hover:ring-neutral-400 text-[8px]"
                  >
                    {post.categorySlug.toUpperCase()}
                  </Link>
                </div>
                <h3
                  className=" text-xs lg:text-sm font-medium text-stone-200 ml-3
                  {post.description} w-[100px]  break-words bg-black  line-clamp-4"
                >
                  {/* {post.description} */}
                </h3>
                <div className="text-xs">
                  <span className="text-stone-200">{post.author}</span>
                  <span className="text-stone-400">
                    - {String(post.createdAt).substring(0, 10)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MostPopular
