// components/ui/toastr.tsx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export function ToasterRoot({ children }: { children: React.ReactNode }) {
  return (
    <ToastPrimitives.Provider swipeDirection="right" duration={3000}>
      {children}
      <ToastPrimitives.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-4 w-[320px] max-w-full outline-none" />
    </ToastPrimitives.Provider>
  )
}

export function Toastr({
  title,
  description,
  variant = "default",
}: {
  title: string
  description?: string
  variant?: "default" | "success" | "error"
}) {
  const [open, setOpen] = React.useState(true)

  const variantClasses = {
    default: "bg-background text-foreground border-border",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  }

  return (
    <ToastPrimitives.Root
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "rounded-xl shadow-lg border px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-bottom",
        variantClasses[variant]
      )}
    >
      <div className="flex-1">
        <ToastPrimitives.Title className="font-semibold text-sm">
          {title}
        </ToastPrimitives.Title>
        {description && (
          <ToastPrimitives.Description className="text-sm opacity-90 mt-1">
            {description}
          </ToastPrimitives.Description>
        )}
      </div>
      <ToastPrimitives.Action asChild altText="Close">
        <button
          onClick={() => setOpen(false)}
          className="ml-auto text-white hover:opacity-80"
        >
          <X className="w-4 h-4" />
        </button>
      </ToastPrimitives.Action>
    </ToastPrimitives.Root>
  )
}
