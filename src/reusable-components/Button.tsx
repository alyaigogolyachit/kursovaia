"use client"

import clsx from "clsx"
import React from "react"

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  custom?: string
  disabled?: boolean
  className?: string
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "flex justify-center rounded-md px-3 py-2 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ",
        {
          "cursor-not-allowed opacity-50": disabled,
          "cursor-pointer": !disabled,
          "w-full": fullWidth,
        },
        className,
      )}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {children}
    </button>
  )
}

export default Button
