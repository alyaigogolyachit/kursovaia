"use client"
import React from "react"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Textarea from "../components/Textarea/Textarea"
import Input from "../Login/Input"
import Button from "../../reusable-components/Button"
import FullSpinner from "@/reusable-components/FullSpinner"
import toast from "react-hot-toast"

function Contacts() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success("send")
        reset()
      } else if (response.status === 422) {
        const errors = await response.json()
        console.log(errors)
        throw new Error("Validation error")
      } else {
        throw new Error(response.statusText)
      }
    } catch (error: any) {
      console.error(error)
      toast.error("Not send")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="center h-screen mt-14">
      <div className=" flex flex-col px-6 md:px-12 py-8  xs:w-10/12 md:w-8/12 lg:w-7/12 xl:w-8/12 bg-gradient-to-b   from-teal-400 to-blue-500 shadow-xl ">
        <h1 className=" header flex flex-col text-xs xs:text-lg items-center text-center py-4 md:text-xl lg:text-2xl xl:text-3xl text-gray-100 outline outline-3 outline-teal-800 bg-teal-700">
          <span>To leave us a suggestion or remark</span>
          <span> please fill the following form</span>
        </h1>
        <div className="flex flex-col items-center mt-4 gap-5 border-x-4 rounded-lg">
          <form
            className="flex flex-col w-3/4 gap-7 mt-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              id="name"
              label="Name and surname"
              type="text"
              required="Name is required"
              register={register}
              errors={errors}
              disabled={isLoading}
              maxLength={30}
              className=""
            />

            <Input
              id="email"
              label="Email address"
              type="text"
              required="Email is required"
              register={register}
              errors={errors}
              disabled={isLoading}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address",
                },
                maxLength: 50,
              }}
            />
            <Input
              id="phone"
              label="Phone number (Optional)"
              type="tel"
              inputMode="tel"
              register={register}
              required={false}
              errors={errors}
              disabled={isLoading}
              placeholder="+380"
              validation={{
                pattern: {
                  value: /^\+380/,
                  message: "Please enter a number that starts with +380",
                },
              }}
              maxLength={13}
            />
            <Textarea
              id="message"
              rows={4}
              label="Message"
              errors={errors}
              required="Message is required"
              disabled={isLoading}
              register={register}
              placeholder="Your message"
              minLength={10}
              maxLength={255}
            ></Textarea>

            <div className="">
              <Button
                disabled={isLoading}
                fullWidth
                className=" bg-indigo-800 text-cyan-300 hover:opacity-90 py-6 shadow-xl"
                type="submit"
              >
                Send to us
              </Button>
            </div>
          </form>
          {isLoading && <FullSpinner />}
        </div>
      </div>
    </div>
  )
}
export default Contacts
