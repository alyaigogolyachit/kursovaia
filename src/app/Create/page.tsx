"use client"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ThoughtArea from "./ThoughtArea"
import Image from "next/image"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { app } from "@/utils/firebase"
import FullSpinner from "@/reusable-components/FullSpinner"

const WritePage = () => {
  const session = useSession()
  const { status } = session
  const router = useRouter()
  const [media, setMedia] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    if (file) {
      const storage = getStorage(app)
      const upload = () => {
        const name = new Date().getTime() + file.name
        const storageRef = ref(storage, name)

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is " + progress + "% done")
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused")
                break
              case "running":
                console.log("Upload is running")
                break
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL)
            })
          },
        )
      }

      file && upload()
    }
  }, [file])

  if (status === "unauthenticated") {
    router.push("/")
  }

  {
    /* <button className=" inline-flex items-center px-5 py-2.5 text-sm font-medium text-center  bg-[#2b4278] rounded-lg focus:ring-4 focus:ring-[#131f3a] hover:bg-[#263a68]">
    Continue later
  </button> */
  }
  return (
    <div className="relative flex flex-col bg-[#132652] mt-3 text-[#6781bf] h-auto">
      <div className="flex flex-col items-center mt-4 text-white">
        <input
          className=" hidden"
          type="file"
          id="image"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0])
              setImageUrl(URL.createObjectURL(e.target.files[0]))
            }
          }}
        />

        <button className=" inline-flex items-center text-sm font-medium text-center  bg-[#2b4278] rounded-lg focus:ring-4 focus:ring-[#131f3a] hover:bg-[#263a68]">
          <label className="px-5 py-2.5 cursor-pointer " htmlFor="image">
            Load main image
          </label>
        </button>
        <div className="mt-8 w-full flex justify-center">
          <Image
            src={`${imageUrl ? imageUrl : "/no_image.png"}`}
            alt="Uploaded"
            width={800}
            height={400}
            className="rounded-lg object-cover  outline-[#000e2e] outline-double max-w-[75%]"
          />
        </div>
      </div>

      {isLoading && <FullSpinner />}

      <ThoughtArea
        isLoading={isLoading}
        setLoading={setIsLoading}
        image={media}
      />
    </div>
  )
}

export default WritePage
