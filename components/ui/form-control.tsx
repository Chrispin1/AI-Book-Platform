"use client"

import * as React from "react"

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
FormControl.displayName = "FormControl"

export { FormControl }