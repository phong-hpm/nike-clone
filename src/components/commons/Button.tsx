import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  variant?: "outline" | "contain";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ rounded = true, variant = "outline", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cls(
          "w-full border font-medium px-5 py-1.5",
          rounded && "rounded-full",
          variant === "contain" && "bg-black text-white",
          variant === "outline" && "border-[#CCCCCC] hover:border-black",
          variant === "contain" && "border-black hover:bg-gray-900 hover:border-gray-900",
          className
        )}
      />
    );
  }
);
