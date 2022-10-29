import { ButtonHTMLAttributes, forwardRef, useMemo } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFull?: boolean;
  rounded?: boolean;
  theme?: "dark" | "light";
  variant?: "outline" | "contain" | "link";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { isFull = true, rounded = true, variant = "outline", theme = "dark", className, ...props },
    ref
  ) => {
    const containClasses = useMemo(() => {
      if (theme === "dark") {
        return "bg-black text-white border-black hover:bg-gray-900 hover:border-gray-900";
      } else {
        return "bg-white text-black border-white hover:bg-gray-200 hover:border-gray-200";
      }
    }, [theme]);

    return (
      <button
        ref={ref}
        {...props}
        className={cls(
          "font-medium",
          variant !== "link" && "border px-5 py-1.5 whitespace-nowrap",
          isFull && "w-full",
          rounded && variant !== "link" && "rounded-full",
          variant === "contain" && containClasses,
          variant === "outline" && "border-[#CCCCCC] hover:border-black",
          variant === "link" && "border-b border-black hover:border-gray-main hover:text-gray-main",
          className
        )}
      />
    );
  }
);
