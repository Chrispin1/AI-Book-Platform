"use client"

import * as React from "react"
import { useForm, type UseFormReturn } from "react-hook-form"
import { FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z, type ZodTypeAny } from "zod"

type FormProps = {
  children: React.ReactNode
  schema: ZodTypeAny
  defaultValues?: any
  onSubmit: (values: any) => void | Promise<void>
} & Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit">

function Form({
  children,
  schema,
  defaultValues,
  onSubmit,
  ...props
}: FormProps) {
  const methods = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit as any)} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

export { Form }
export type { UseFormReturn }