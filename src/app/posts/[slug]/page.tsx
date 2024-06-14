import Image from "next/image"
import { Post } from "@/types/types"
import Comments from "../../components/Comments/Comments"
import SideMenu from "@/app/Home/Side_Menu/SideMenu"
import BodyText from "./text"

type Params = {
  slug: string
}

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed")
  }

  return res.json()
}

const SinglePage = async ({ params }: { params: Params }) => {
  const { slug } = params

  const data: { post: Post } = await getData(slug)
  const { post } = data

  return (
    <div className="mt-5 ">
      <div className="lg:container bg-[#1e1919] pb-12 pt-6">
        <div className="flex flex-col items-center gap-6 sm:gap-12 px-4 md:pd-0 ">
          <div className="flex justify-between gap-2 xs:gap-5 w-full h-24 xs:h-32 sm:h-44 md:h-60">
            <div className="flex flex-col sm:mt-0 sm:flex-row sm:justify-center basis-1/6 xs:basis-2/6 shrink items-center gap-1 xs:gap-5">
              <div className="size-8 xxs:size-12 xs:size-16 md:size-24 2xl:size-32 relative">
                <Image
                  src={
                    post?.authorNameRel.image
                      ? post.authorNameRel.image
                      : "/no_avatar.png"
                  }
                  alt=""
                  fill
                  className=" rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 text-slate-100">
                <span className="text-[11px] xs:text-lg md:text-xl 2xl:text-3xl font-medium italic">
                  {post.author}
                </span>
                <span className=" text-[6px] xxs:text-[8px] xs:text-sm md:text-base 2xl:text-lg">
                  {String(post.createdAt).substring(0, 10)}
                </span>
              </div>
            </div>
            <div className=" flex-1 relative ">
              <Image
                src={post.image ? post.image : "/no_image.png"}
                alt=""
                fill
                className="object-cover border-solid border-4 border-[#2e1715] shadow-md shadow-[#443735]"
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="header text-xl xxs:text-2xl xs:text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl mb-4 text-center 2xl:leading-[60px]">
              {post.title}
            </h1>
          </div>
        </div>
        <div className="flex gap-12 lg:mb-10 mx-3 md:mx-10">
          <div className="w-full text-xs xs:text-base md:text-xl font-light mb-8 text-justify text-zinc-200 bg-[#161313] p-5 border border-[#1c1919]">
            <BodyText initialHtml={post.body} />
          </div>
        </div>
        <Comments postSlug={slug} />
      </div>
      <SideMenu />
    </div>
  )
}

export default SinglePage
