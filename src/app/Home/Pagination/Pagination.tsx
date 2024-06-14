"use client"

import { useRouter } from "next/navigation"
import Button from "@/reusable-components/Button"
import clsx from "clsx"

type PaginationProps = {
  page: number
  hasPrev: boolean
  hasNext: boolean
}

function Pagination({ page, hasPrev, hasNext }: PaginationProps) {
  const router = useRouter()

  const handlerNextButton = () => {
    router.push(`?page=${page + 1} `)
  }
  const handlerPrevButton = () => {
    router.push(`?page=${page - 1} `)
  }

  return (
    <div className="flex justify-between sm:mx-4">
      <Button
        className={clsx(
          "w-24 p-2 lg:p-3 rounded-xl bg-gradient-to-tr from-cyan-300  to-sky-600 shadow-lg shadow-blue-500/50  focus:ring focus:ring-inset focus:ring-cyan-600",
          !!hasPrev && "hover:opacity-85",
        )}
        disabled={!hasPrev}
        onClick={handlerPrevButton}
      >
        Previous
      </Button>
      <Button
        className={clsx(
          "w-24 p-2 lg:p-3 rounded-xl bg-gradient-to-tr from-cyan-300  to-sky-600 shadow-lg  shadow-blue-500/50 focus:ring focus:ring-inset focus:ring-cyan-600",
          !!hasNext && "hover:opacity-85",
        )}
        disabled={!hasNext}
        onClick={handlerNextButton}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination
