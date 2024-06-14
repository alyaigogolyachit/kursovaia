"use client"

import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import Input from "./Input"
import Button from "../../reusable-components/Button"
import toast from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import FullSpinner from "@/reusable-components/FullSpinner"

type Variant = "LOGIN" | "REGISTER"
const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/Profile")
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    if (variant === "REGISTER") {
      axios
        .post("../api/register", data)
        .then(() => {
          signIn("credentials", data)
          toast.success("Successful registration!")
        })

        .catch(() => toast.error("Something went wrong!"))
        .finally(() => {
          setIsLoading(false)
        })
    }
    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials")
          }
          if (callback?.ok) {
            toast.success("Logged in!")
          }
        })
        .catch((error) => {
          console.error("Error during sign in:", error)
          toast.error("An unexpected error occurred")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <>
      {session?.status === "loading" ? (
        <FullSpinner />
      ) : (
        <div>
          <form
            className="flex flex-col gap-7 mt-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Username"
                register={register}
                errors={errors}
                disabled={isLoading}
                maxLength={30}
                required="Name is required"
              />
            )}
            <Input
              id="email"
              label="Email address"
              type="email"
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
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
              maxLength={30}
              required="Password is required"
            />
            <div className="mt-2">
              <Button
                disabled={isLoading}
                fullWidth
                className="bg-indigo-500 text-cyan-300 py-4"
                type="submit"
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>
          <div className="flex flex-col gap-2 mt-6 text-xs md:text-sm text-cyan-200">
            <div className="flex gap-2 justify-center nt-6 px-2">
              {variant === "LOGIN"
                ? "New to Blog App?"
                : "Already have an account"}
            </div>
            <div
              onClick={toggleVariant}
              className="flex justify-center underline cursor-pointer"
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default AuthForm
