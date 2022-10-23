import { FC, HTMLAttributes } from "react";

export interface SliderContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const SliderContainer: FC<SliderContainerProps> = ({ className, ...props }) => {
  return <div className={cls("flex overflow-x-hidden", className)} {...props} />;
};
