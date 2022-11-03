import { FC, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  containerClass?: string;
  startAdornmentClass?: string;
  endAdornmentClass?: string;
}

export const Input: FC<InputProps> = ({
  startAdornment,
  endAdornment,
  className,
  containerClass,
  startAdornmentClass,
  endAdornmentClass,
  ...props
}) => {
  return (
    <div
      className={cls(
        "flex items-center border border-gray-main w-full px-4 rounded-lg overflow-hidden",
        startAdornment && "!pl-0",
        endAdornment && "pr-0",
        containerClass
      )}
    >
      {startAdornment && <div className={cls("p-4", startAdornmentClass)}>{startAdornment}</div>}
      <input className={cls("outline-none w-full py-4", className)} {...props} />
      {endAdornment && <div className={cls("p-4", endAdornmentClass)}>{endAdornment}</div>}
    </div>
  );
};
