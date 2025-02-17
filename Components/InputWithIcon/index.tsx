import * as React from "react";
import { cn } from "@/lib/utils";

type InputWithIconProps = {
  className?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  startIcon?: React.ReactElement;
  variant?: "default" | "secondary";
  endIcon?: React.ReactElement;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, startIcon, endIcon, variant = "default", ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className={cn("w-full relative", variant === "secondary" ? "flex items-center" : "")}>
        {StartIcon && (
          <div
            className={cn(
              "absolute left-0 top-0 h-full flex items-center justify-center",
              variant === "secondary" ? "w-10 border-r border-l border-input rounded-tl-md rounded-bl-md font-medium" : "left-3 top-1/2 transform -translate-y-1/2"
            )}
          >
            <StartIcon.type
              className={cn(
                variant === "secondary" ? "h-5 w-5" : "h-[18px] w-[18px]"
              )}
              {...startIcon.props}
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon
              ? variant === "secondary"
                ? "pl-12 border-l-0"
                : "pl-8"
              : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <EndIcon.type
              className={cn("h-[18px] w-[18px]")}
              {...endIcon.props}
            />
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };