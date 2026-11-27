"use client"

import * as React from "react"

const FormField = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
FormField.displayName = "FormField"

export { FormField }