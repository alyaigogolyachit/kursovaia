"use client"
import dynamic from "next/dynamic"

const ClipLoader = dynamic(() => import("react-spinners/ClipLoader"), {
  ssr: false,
})

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-center items-center ">
      {isLoading && <ClipLoader color="#00ffcc" loading={true} size={50} />}
    </div>
  )
}

export default Spinner
