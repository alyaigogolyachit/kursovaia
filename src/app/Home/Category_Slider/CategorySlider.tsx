"use client"

import Link from "next/link"
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Category } from "@/types/types"
import { useEffect, useState } from "react"
import Spinner from "@/reusable-components/Spinner"
// const data = [
//   { id: 0, image: "/categories/art.jfif", title: "Art" },
//   { id: 1, image: "/categories/litra.jfif", title: "Literature" },
//   { id: 2, image: "/categories/music.jfif", title: "Music" },
//   { id: 3, image: "/categories/Bogosloviye.jfif", title: "Theology" },
//   { id: 4, image: "/categories/Plato.jfif", title: "Philosophy" },
//   { id: 5, image: "/categories/history.jfif", title: "History" },
//   { id: 6, image: "/categories/code.jfif", title: "Coding" },
// ]
const animation = { duration: 10000, easing: (t: number) => t }

function CategorySlider() {
  const [data, setData] = useState<Category[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(process.env.NEXT_PUBLIC_API_URL)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        )
        const result: Category[] = await res.json()
        setData(result)
      } catch (error) {
        throw new Error("Failed")
      }
    }

    fetchData()
  }, [])

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    renderMode: "precision",
    drag: true,
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(min-width: 576px)": {
        slides: {
          perView: 2,
          spacing: 30,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 40,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 55,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 3,
          spacing: 55,
        },
      },
    },
    created(s) {
      s.moveToIdx(3, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 3, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 3, true, animation)
    },
  })
  if (!data || data.length === 0) {
    return <Spinner isLoading={true} />
  }
  return (
    <div className=" w-full overflow-hidden">
      <h1 className="header my-10 text-slate-200">Popular Categories</h1>
      <div
        ref={sliderRef}
        className="mt-14 flex justify-between select-none keen-slider"
      >
        {data?.map((item: Category, ind: number) => (
          <Link
            href={`/blog?cat=${item.title.toLowerCase()}`}
            className={`flex  items-center keen-slider__slide number-slide${ind + 1}`}
            key={item.id}
          >
            {item.img && (
              <Image
                src={`/categories${item.img}`}
                alt=""
                width={112}
                height={112}
                className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-28 lg:w-28"
              />
            )}
            <p className="text-sm  text-center md:text-lg blg:text-xl capitalize ml-2 text-neutral-900 ">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategorySlider
