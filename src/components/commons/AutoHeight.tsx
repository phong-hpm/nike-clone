import { FC, HTMLAttributes, useRef } from "react";

export interface AutoHeightProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  className?: string;
  contentClass?: string;
}

/**
 * [AutoHeight] always keep itself to be square,
 * when it's width was changed, it's height will be update automatically
 */
export const AutoHeight: FC<AutoHeightProps> = ({
  ratio = 1,
  className,
  contentClass,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cls("relative overflow-hidden", className)}
      style={{ paddingTop: `${ratio ? (1 / ratio) * 100 : 0}%` }}
    >
      <div className={cls("absolute top-0 left-0 w-full h-full", contentClass)}>{children}</div>
    </div>
  );
};
