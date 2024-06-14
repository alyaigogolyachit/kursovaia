import Link from "next/link"
import Image from "next/image"
import { Post } from "@/types/types"
import postParse from "@/libs/parsing"

const FoundPost = ({ post }: { post: Post }) => {
  return (
    <div className="p-4 m-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 relative">
          <Image
            src={
              post.authorNameRel.image
                ? post.authorNameRel.image
                : "/black_no_avatar.png"
            }
            alt={post.authorNameRel.name}
            fill
            className="rounded-full"
          />
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-semibold">{post.authorNameRel.name}</h2>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Link href={`/posts/${post.slug}`}>
        <div className="block mb-2">
          <h3 className="text-xl font-bold text-blue-600">{post.title}</h3>
        </div>
      </Link>
      <p className="text-gray-700 mb-4">
        {post.description.length > 100
          ? `${post.description.substring(0, 100)}...`
          : post.description}
      </p>
      {post.image && (
        <div className="w-full h-64 relative mb-4">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <Link href={`/posts/${post.slug}`}>
        <p className="text-blue-500 hover:underline">Read more</p>
      </Link>
    </div>
  )
}

export default FoundPost
