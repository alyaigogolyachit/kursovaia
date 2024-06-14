import Image from "next/image"
import Link from "next/link"
import { Post } from "@/types/types"

interface RecentPostProps {
  item: Post
  key?: string | number
}

export default function RecentPost({ item }: RecentPostProps) {
  return (
    <div className="flex flex-col md:flex-row gap-5 lg:gap-12  mb-12">
      <div className=" md:flex-1 w-9/12 h-60 relative lg:h-80 ">
        <Link href={`/posts/${item.slug}`}>
          <Image
            src={item.image ? item.image : "/no_image.png"}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw"
            className="defImg"
          />
        </Link>
      </div>
      <div className="flex md:flex-1 flex-col gap-3 lg:gap-7">
        <div className="flex items-center gap-2 text-sm">
          <span className="">{String(item.createdAt).substring(0, 10)} —</span>
          <Link
            href={`/blog?cat=${item.categorySlug}`}
            className="theme items-end hover:ring hover:ring-inset hover:ring-neutral-400"
          >
            {item.categorySlug.toUpperCase()}
          </Link>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h2 className=" text-xl font-normal hover:underline">{item.title}</h2>
        </Link>
        <div className="font-light text-base line-clamp-4 lg:line-clamp-6 break-words md:max-w-[250px] lg:max-w-[500px]">
          {item.description}
        </div>
        <div className="mt-auto">
          <Link href={`/posts/${item.slug}`} className=" hover:underline w-max">
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}
