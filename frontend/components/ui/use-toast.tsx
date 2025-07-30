"use client"

import { useCallback } from "react"
import { toast as toastFn } from "sonner"

type ToastVariant = "default" | "destructive" | "success" | "info" | "warning"
interface Toast {
  variant?: ToastVariant
  title?: string
  description?: string
  action?: React.ReactNode
  [key: string]: any
}

export function useToast() {
  const toast = useCallback(
    ({ variant, title, description, action, ...props }: Toast) => {
      const toastMethod =
        variant === "default"
          ? toastFn
          : variant === "destructive"
            ? toastFn.error
            : toastFn[variant as "success" | "info" | "warning"]

      toastMethod(title, {
        description,
        action,
        ...props,
      })
    },
    []
  )

  return { toast }
}