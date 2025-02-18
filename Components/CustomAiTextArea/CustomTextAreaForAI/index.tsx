import * as React from "react"

import { cn } from "@/lib/utils"

const TextareaAI = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex resize-none min-h-[60px] w-full rounded-md border border-none bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TextareaAI.displayName = "TextareaAi"

export { TextareaAI }
