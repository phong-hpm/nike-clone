import { FC, HTMLAttributes, useRef } from "react";

export interface AutoHeightProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

/**
 * [AutoHeight] always keep itself to be square,
 * when it's width was changed, it's height will be update automatically
 */
export const AutoHeight: FC<AutoHeightProps> = ({ ratio = 1, children, ...props }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      {...props}
      className="relative overflow-hidden"
      style={{ paddingTop: `${ratio ? (1 / ratio) * 100 : 0}%` }}
    >
      <div className="absolute top-0 left-0 w-full h-full">{children}</div>
    </div>
  );
};
