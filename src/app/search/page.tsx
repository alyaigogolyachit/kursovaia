"use client"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import FoundPost from "./FoundPost"
import { Post } from "@/types/types"
import FullSpinner from "@/reusable-components/FullSpinner"

const fetchPosts = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

const SearchPage = () => {
  const search = useSearchParams()
  const searchQuery = search.get("q")

  const encodedSearchQuery = encodeURI(searchQuery || "")

  const { data, isLoading, error } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
  )
  if (isLoading) {
    return <FullSpinner />
  }
  if (error) {
    return (
      <div>
        <h1>Failed to load data.</h1>
      </div>
    )
  }
  if (!data?.posts || data.posts.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] mt-10">
        <h1 className=" bg-slate-400 p-10 rounded-sm header">
          No posts found.
        </h1>
      </div>
    )
  }
  return (
    <div>
      {data?.posts?.map((post: Post) => (
        <FoundPost post={post} key={post.id} />
      ))}
    </div>
  )
}

export default SearchPage
