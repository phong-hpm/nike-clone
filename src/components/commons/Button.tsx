import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFull?: boolean;
  rounded?: boolean;
  theme?: "dark" | "light";
  variant?: "outline" | "contain";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { isFull = true, rounded = true, variant = "outline", theme = "dark", className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cls(
          "border font-medium px-5 py-1.5 whitespace-nowrap",
          isFull && "w-full",
          rounded && "rounded-full",
          variant === "contain" && theme === "dark" ? "bg-black text-white" : "bg-white text-black",
          variant === "contain" && theme === "dark"
            ? "border-black hover:bg-gray-900 hover:border-gray-900"
            : "border-white hover:bg-gray-200 hover:border-gray-200",
          variant === "outline" && "border-[#CCCCCC] hover:border-black",
          className
        )}
      />
    );
  }
);
