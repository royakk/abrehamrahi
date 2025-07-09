import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { IMAGES } from "@/lib/images";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactElement;
  required?: boolean;
  error?: string;
  parentClassName?: string;
  additionalComponent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const id = React.useId();

    const dir =
      props.dir ||
      (type && ["tel", "password", "number"].includes(type)
        ? "ltr"
        : undefined);

    return (
      <div className={`flex w-full flex-col gap-2 ${props.parentClassName}`}>
        {props.label && (
          <label
            htmlFor={id}
            className="inline-block text-sm font-normal text-black"
          >
            {props.label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            {...props}
            dir={dir}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            ref={ref}
            required={false}
            className={cn(
              "flex h-[38px] w-full rounded-[4px] border border-Net-1-03 bg-newblack200 px-3 py-1 text-sm font-normal transition-colors file:border-0 file:text-sm file:font-medium file:text-foreground placeholder:text-Net-1-07 focus-visible:outline-none focus-visible:bg-white focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className,
              `${props.error && "border-red200"}`,
              type === "password" && "pr-10 placeholder:text-right",
              type === "tel" && "placeholder:text-right",
              type === "number" && "pl-[50px] text-red200"
            )}
          />
          {props.additionalComponent && <>{props.additionalComponent}</>}
          {props.error && (
            <p className="absolute top-[110%] text-xs text-red200">
              {props.error}
            </p>
          )}

          {type === "password" && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-1/2 -translate-y-1/2 px-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <img src={IMAGES.eye} className="size-5" />
              ) : (
                <img src={IMAGES.eyeSlash} className="size-5" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
