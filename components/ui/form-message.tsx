"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

type FormMessageProps = {
  children?: React.ReactNode
  className?: string
}

function FormMessage({ children, className }: FormMessageProps) {
  const { getFieldState, formState } = useFormContext()
  // Simple implementation - children can be the error message
  return (
    <p className={className}>{children}</p>
  )
}

export { FormMessage }
export type { FormMessageProps }