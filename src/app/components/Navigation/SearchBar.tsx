"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import toast from "react-hot-toast"

function SearchBar() {
  const search = useSearchParams()

  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : "",
  )

  const router = useRouter()

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (typeof searchQuery !== "string") {
      return
    }

    const encodedSearchQuery = encodeURI(searchQuery.trim())
    if (!encodedSearchQuery) {
      toast.error("Your query field is blanked!")
      return
    }
    router.push(`/search?q=${encodedSearchQuery}`)
  }
  return (
    <>
      <form onSubmit={onSearch} className="flex w-full items-center">
        <input
          className="px-2 w-full text-slate-400 rounded-full bg-gray-800 focus:bg-gray-700 focus:outline-none focus:ring-[2px] focus:ring-cyan-900 placeholder:text-zinc-400"
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
          type="text"
          placeholder="Search for the post..."
        />
        <div className="flex justify-center m-1 lg:m-2 rounded-full cursor-pointer hover:text-slate-300 hover:bg-slate-400">
          <CiSearch size={24} onClick={onSearch} />
        </div>
      </form>
    </>
  )
}

export default SearchBar
