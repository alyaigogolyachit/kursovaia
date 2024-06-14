import React from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import clsx from "clsx"

interface TextareaProps {
  id: string
  label?: string
  rows?: number
  errors: FieldErrors<any>
  disabled: boolean
  register: UseFormRegister<any>
  required?: boolean | string
  placeholder?: string
  minLength?: number
  maxLength?: number
  strictMaxLength?: number
  className?: string
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  rows,
  errors,
  disabled,
  register,
  required,
  placeholder,
  minLength,
  maxLength,
  strictMaxLength,
  className,
}) => (
  <div>
    {label && (
      <label
        className="block w-full text-lg md:text-xl font-bold leading-6 text-indigo-100"
        htmlFor={id}
      >
        {label}
      </label>
    )}

    <div className="mt-2">
      <textarea
        maxLength={strictMaxLength}
        id={id}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id, {
          required: required,
          minLength: minLength,
          maxLength: maxLength,
        })}
        className={clsx(
          className
            ? className
            : " resize-none form-input w-full py-[10px] rounded-md text-sm border-0 ring-inset  shadow-lg placeholder:text-slate-400 placeholder:text-base focus:ring-2 focus:ring-inset focus:ring-sky-600 ",
          errors[id] && "ring ring-rose-500",
          disabled && "opacity-50 cursor-default",
        )}
      />
      {errors[id] && (
        <div className="mt-3 font-bold text-red-700 shadow-lg p-1 rounded-lg inline-block bg-slate-50">
          {errors[id]?.type === "minLength"
            ? `Your ${id} lacks clarity of expression, please describe it more precisely`
            : errors[id]?.type === "maxLength"
              ? `Your ${id} is too large for this form`
              : String(errors[id]?.message)}
        </div>
      )}
    </div>
  </div>
)

export default Textarea
