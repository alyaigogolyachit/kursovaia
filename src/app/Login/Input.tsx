"use client"

import clsx from "clsx"
import React from "react"
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form"

interface InputProps {
  label?: string
  id: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<any>
  type?: string
  required?: boolean | string
  minLength?: number
  maxLength?: number
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
  disabled?: boolean
  placeholder?: string
  validation?: RegisterOptions
  custom?: boolean
  className?: string
  errorClassName?: string
}
const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
  validation,
  minLength,
  maxLength,
  inputMode,
  custom,
  className,
  errorClassName,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputMode === "tel") {
      e.target.value = e.target.value.replace(/[^\d+]/g, "")
    }
  }

  return (
    <div>
      {label && (
        <label
          className="block w-full text-lg md:text-xl font-semibold leading-6 text-indigo-100"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="mt-2 ">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          placeholder={placeholder}
          inputMode={inputMode}
          onInput={handleInput}
          {...register(id, {
            required: required,
            minLength: minLength,
            maxLength: maxLength,
            ...validation,
          })}
          className={clsx(
            !custom &&
              "form-input w-full py-[10px] rounded-md text-sm border-0 shadow-sm ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-600",
            custom && className,
            errors[id] && "ring ring-rose-500",
            disabled && "opacity-50 cursor-default",
          )}
        />
        {/* focus:ring-sky-600  */}
        {errors[id] && (
          <div
            className={
              errorClassName
                ? errorClassName
                : "mt-3 font-bold text-red-700 inline-block shadow-lg p-1 rounded-lg  bg-slate-50"
            }
          >
            {errors[id]?.type === "maxLength"
              ? `Your ${id} is too large for this form`
              : String(errors[id]?.message)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
