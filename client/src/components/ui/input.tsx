import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border-2 border-gray-700 bg-gray-900/50 backdrop-blur-sm px-4 py-3 text-base text-white placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 focus:bg-gray-800/70 hover:border-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-900/30",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
