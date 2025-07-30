"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "bg-background border border-border text-foreground rounded-md shadow-lg p-4",
          title: "text-sm font-semibold",
          description: "text-sm opacity-90",
          actionButton: "bg-primary text-primary-foreground rounded-md px-3 py-1 text-sm",
          cancelButton: "bg-muted text-muted-foreground rounded-md px-3 py-1 text-sm",
          default: "bg-background text-foreground",
          success: "bg-green-500 text-white",
          error: "bg-destructive text-destructive-foreground",
          info: "bg-blue-500 text-white",
          warning: "bg-yellow-500 text-white",
        },
      }}
    />
  )
}