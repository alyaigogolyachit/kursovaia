"use client"

import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Comment } from "@/types/types"
import Button from "@/reusable-components/Button"
import clsx from "clsx"
import toast from "react-hot-toast"

const fetcher = async (url: string) => {
  const res = await fetch(url)

  const data = await res.json()

  if (!res.ok) {
    const error = new Error(data.message)
    throw error
  }

  return data
}

const Comments = ({ postSlug }: { postSlug: string }) => {
  const NUMBER_PER_ATTEMPT = "5"
  const { status } = useSession()

  const [currentPage, setCurrentPage] = useState(1)
  const [loadedComments, setLoadedComments] = useState<Comment[]>([])
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [totalComments, setTotalComments] = useState(0)
  const [limit, setLimit] = useState<string | number>(NUMBER_PER_ATTEMPT)

  useEffect(() => {
    const savedCommentsCount = sessionStorage.getItem(
      `commentsCount_${postSlug}`,
    )
    if (savedCommentsCount) {
      setLimit(parseInt(savedCommentsCount))
    }
  }, [postSlug])

  useEffect(() => {
    if (loadedComments.length > 0) {
      const storedLoadedComments = parseInt(
        sessionStorage.getItem(`commentsCount_${postSlug}`) || "0",
      )
      const newLoadedCommentsCount = Math.max(
        storedLoadedComments,
        loadedComments.length,
      )
      sessionStorage.setItem(
        `commentsCount_${postSlug}`,
        newLoadedCommentsCount.toString(),
      )
    }
  }, [loadedComments.length])

  const { mutate, isLoading } = useSWR(
    `${process.env.NEXT_URL}/api/comments?postSlug=${postSlug}&limit=${limit || NUMBER_PER_ATTEMPT}`,
    fetcher,
    {
      onSuccess: (data) => {
        setLoadedComments(data.comments)
        setTotalComments(data.count)
      },
    },
  )

  const fetchMoreComments = async () => {
    setIsFetchingMore(true)

    const newPage = currentPage + 1

    const moreComments = await fetcher(
      `/api/comments?postSlug=${postSlug}&page=${newPage}`,
    )

    setLoadedComments((prevComments) => [
      ...prevComments,
      ...moreComments.comments,
    ])
    const newLoadedCommentsCount =
      loadedComments.length + moreComments.comments.length
    sessionStorage.setItem(
      `commentsCount_${postSlug}`,
      newLoadedCommentsCount.toString(),
    )
    setCurrentPage(newPage)
    setIsFetchingMore(false)
  }

  const [content, setContent] = useState("")
  const [isFetching, setIsFetching] = useState(false)

  const handleSubmit = async () => {
    if (content) {
      setIsFetching(true)
      setContent("")
      await fetch(`${process.env.NEXT_URL}/api/comments`, {
        method: "POST",
        body: JSON.stringify({ content, postSlug }),
      })
      mutate()
      const temp = parseInt(
        sessionStorage.getItem(`commentsCount_${postSlug}`) || "0",
      )
      sessionStorage.setItem(`commentsCount_${postSlug}`, `${temp + 1}`)
      setCurrentPage(1)
      setIsFetching(false)
    } else {
      toast.error("Your comment is blanked")
    }
  }

  return (
    <div className="mx-10 ">
      <h1 className="header first-letter:mb-7 text-sm xs:text-base md:text-lg 2xl:text-xl p-2 ring ring-inset ring-[#3c2e2e] shadow shadow-[#0b0b0b] bg-slate-600 rounded-lg inline-block ">
        Comments
      </h1>
      <div>
        {isLoading ? (
          <div className="mt-10 text-center">
            <h1 className="text-white">Loading Comments...</h1>
          </div>
        ) : (
          <>
            {status === "authenticated" ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 xs:gap-7 md:text-base text-sm ">
                <textarea
                  rows={4}
                  value={content}
                  placeholder="write a comment..."
                  className={clsx(
                    "mt-7 p-2 xl:p-3 w-full placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-lg resize-none bg-zinc-400 rounded-sm placeholder:text-black",
                    isFetching && "opacity-70",
                  )}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isFetching}
                />
                <Button
                  onClick={handleSubmit}
                  className={`w-24 p-2 lg:p-3 text-[#ffe3c0] bg-gradient-to-tr from-[#d09d5f]  to-[#603501] shadow-lg shadow-[#4d3d2a] md:text-base xs:text-sm text-xs focus:ring-2 focus:ring-inset focus:ring-orange-400 ${!isFetching && "hover:opacity-85"}`}
                  disabled={isFetching}
                >
                  Send
                </Button>
              </div>
            ) : (
              <div className=" bg-[#161313] border border-[#1c1919] py-1 flex justify-center hover:opacity-90">
                <Link
                  href="/Login"
                  className="text-xs xs:text-sm md:text-base text-rose-300 p-2 rounded-lg bg-stone-970 bg-stone-950"
                >
                  Login to write a comment
                </Link>
              </div>
            )}

            {loadedComments && loadedComments.length > 0 ? (
              loadedComments?.map((item) => (
                <div className="mt-7" key={item.id}>
                  <div className="flex items-center gap-5 mb-5">
                    <div className="size-8 sm:size-12 md:size-16 2xl:size-20  relative ">
                      <Image
                        src={
                          item.author.image
                            ? item.author.image
                            : "/no_avatar.png"
                        }
                        alt=""
                        fill
                        className=" rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-[#ffecda]">
                      <span className="text-xs xs:text-sm md:text-base 2xl:text-lg font-medium italic">
                        {item.authorName}
                      </span>
                      <span className="text-[8px] fs xs:text-sm md:text-base 2xl:text-lg">
                        {String(item.createdAt).substring(0, 10)}
                      </span>
                    </div>
                  </div>
                  <p className=" text-xs xs:text-base md:text-xl text-[#edc79c] bg-[#161313] border border-[#1c1919] p-3">
                    {item.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="">
                <h1
                  className="header text-sm xs:text-base md:text-lg 2xl:text-xl text-center mt-7
            "
                >
                  No comments yet...
                </h1>
              </div>
            )}
            {!!loadedComments.length && (
              <div className="flex justify-center mt-5">
                <Button
                  onClick={fetchMoreComments}
                  className=" p-2 lg:p-3 text-[#ffe3c0] bg-gradient-to-tr from-[#d09d5f]  to-[#603501] hover:bg-gradient-to-bl shadow-lg shadow-[#4d3d2a] md:text-base xs:text-sm text-xs focus:ring-2 focus:ring-inset focus:ring-orange-400"
                  fullWidth
                  disabled={
                    isFetchingMore ||
                    totalComments ===
                      parseInt(
                        sessionStorage.getItem(`commentsCount_${postSlug}`) ||
                          "0",
                      )
                  }
                >
                  {totalComments <
                  parseInt(
                    sessionStorage.getItem(`commentsCount_${postSlug}`) || "0",
                  )
                    ? isFetchingMore
                      ? "Loading..."
                      : "Load More"
                    : "All comments have been shown"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Comments
