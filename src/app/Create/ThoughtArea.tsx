import React, { useState, useEffect, useRef, forwardRef } from "react"
import { generateSlug } from "@/libs/generateSlug"
// import ReactQuill, { Quill, ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../Login/Input"
import Textarea from "../components/Textarea/Textarea"
import postParse from "@/libs/parsing"
import { FaPlus } from "react-icons/fa6"

import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

interface ThoughtAreaProps {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  image: string
}

const CustomReactQuill = forwardRef<any, any>((props, ref) => (
  <ReactQuill ref={ref} {...props} />
))
CustomReactQuill.displayName = "CustomReactQuill"

function ThoughtArea({ setLoading, isLoading, image }: ThoughtAreaProps) {
  const [content, setContent] = useState("")
  const router = useRouter()
  const quillRef = useRef<any | null>(null)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  }
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "background",
    "color",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "align",
    "code-block",
  ]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      description: "",
    },
    mode: "onChange",
  })
  const titleInp = watch("title")
  const slugInp = watch("slug")
  const catInp = watch("category")
  const descInp = watch("description")

  useEffect(() => {
    const autoSlug = generateSlug(titleInp)
    setValue("slug", autoSlug)
  }, [titleInp, setValue])

  const validateCategory = (value: string) => {
    const regex = /^#[a-zA-Z]*$/
    if (regex.test(value.trim())) {
      return true
    } else {
      return "Category field has to start with '#' then has to continue with your category without any whitespace"
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)

    const editor = quillRef.current?.getEditor()

    const text = editor?.getText()
    const textLength = text?.trim().length
    if (!textLength) {
      toast.error("Your blog is blanked")
      setLoading(false)
      return false
    }
    const contentHTML = editor?.root.innerHTML

    const postData = {
      title: data.title,
      description: data.description,
      slug: data.slug,
      categorySlug: data.category,
      body: contentHTML,
      image: image || null,
    }
    try {
      const res = await fetch(`${process.env.NEXT_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })
      if (!res.ok) {
        throw new Error("Failed to submit the form")
      }
      toast.success("Blog post created successfully!")

      if (res.status === 200) {
        const data = await res.json()
        router.push(`/posts/${data.slug}`)
      }
    } catch (error) {
      toast.error("Failed to create blog post")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Title */}
      <Input
        label=""
        register={register}
        required="Title is required"
        type="text"
        errors={errors}
        disabled={isLoading}
        maxLength={30}
        custom
        id="title"
        placeholder="Title"
        className="   w-full px-4 py-5 text-5xl outline-none border-none bg-transparent font-bold placeholder:text-violet-400 text-violet-500 "
        errorClassName="mt-3 font-bold text-red-700 shadow-lg p-1 rounded-lg  bg-slate-50 flex justify-center"
        validation={{ maxLength: 25 }}
      />

      <div className=" grid grid-cols-1 lg:grid-cols-2 px-3 gap-4">
        {/* Blog Editor */}
        <div className="w-full max-w-3xl p-5 my-3 bg-[#122145] border border-[#101c36] rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog Editor
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Slug */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium leading-6 text-white mb-2 "
                >
                  Blog Slug
                </label>
                <div className="mt-2">
                  <Input
                    register={register}
                    type="text"
                    errors={errors}
                    disabled={isLoading}
                    required="Slug is required"
                    id="slug"
                    custom
                    className=" create-inp1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 "
                    placeholder="blog-slug"
                    validation={{
                      pattern: {
                        value: /^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/,
                        message:
                          "Please enter a valid slug or trust one already suggested",
                      },
                      maxLength: 25,
                    }}
                  />
                </div>
              </div>
              {/* Category */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium leading-6 text-white mb-2 "
                >
                  Blog Category
                </label>
                <div className="mt-2">
                  <Input
                    register={register}
                    type="text"
                    errors={errors}
                    disabled={isLoading}
                    required="Category is required"
                    id="category"
                    custom
                    className=" create-inp1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 "
                    placeholder="#Category"
                    validation={{ validate: validateCategory, maxLength: 25 }}
                  />
                </div>
              </div>
              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Blog Description
                </label>
                <Textarea
                  register={register}
                  id="description"
                  rows={3}
                  errors={errors}
                  required="Message is required"
                  disabled={isLoading}
                  minLength={5}
                  strictMaxLength={220}
                  className="create-inp2 resize-none   focus:ring-2 focus:ring-inset  focus:ring-purple-500 focus:border-purple-500 "
                  placeholder="Write your thoughts here..."
                ></Textarea>
              </div>
              {/* Content */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Blog Content
                </label>
                <CustomReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  className="text-black bg-white"
                  placeholder={"Start your Blog..."}
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-900 hover:bg-purple-800"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              <span>Create Blog Post</span>
            </button>
          </form>
        </div>

        {/* Blog View */}
        <div className=" w-full max-w-3xl p-5 my-3 bg-[#122145] border border-[#101c36] rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog View
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Slug */}
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-white mb-2 sm:text-sm sm:leading-6">
                Blog Slug
              </h2>
              <div className="mt-2">
                <p className="create-inp1 break-words h-10">{slugInp}</p>
              </div>
            </div>
            {/* Category */}
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium text-white mb-2 sm:text-sm sm:leading-6">
                Blog Category
              </h2>
              <p className="create-inp1 break-words h-10">{catInp}</p>
            </div>
            {/* Description */}
            <div className="sm:col-span-2">
              <h2 className="block mb-2 text-sm font-medium text-white ">
                Blog Description
              </h2>
              <p className="create-inp2 break-words min-h-[81.6px]">
                {descInp}
              </p>
            </div>
            <div className="sm:col-span-full">
              <h2 className="block mb-2 text-sm font-medium text-white">
                Blog Content
              </h2>
              <div className="text-black bg-white py-3 px-6 min-h-[110px] break-words ">
                {postParse(content)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThoughtArea
