"use client"

import * as React from "react"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
  <label ref={ref} className={className} {...props} />
))
FormLabel.displayName = "FormLabel"

export { FormLabel }