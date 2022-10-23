import { FC, ReactNode } from "react";

// components
import { IconSvg } from "../IconSvg";

export interface SliderProps {
  activeIndex: number;
  title?: string;
  backTitle?: string;
  backClass?: string;
  titleClass?: string;
  className?: string;
  children: ReactNode;
  onBack?: () => void;
}

export const Slider: FC<SliderProps> = ({
  activeIndex,
  title,
  backTitle,
  className,
  backClass,
  titleClass,
  children,
  onBack,
}) => {
  return (
    <div
      className={cls("shrink-0 flex flex-col w-full px-8 py-4 transition-transform", className)}
      style={{ transform: `translateX(-${activeIndex * 100}%)` }}
    >
      {backTitle && (
        <div className={cls("flex cursor-pointer mb-4", backClass)} onClick={onBack}>
          <IconSvg icon="arrow" className="arrow-left thin ml-[-5px] mr-2" />
          <p>{backTitle}</p>
        </div>
      )}

      {title && <p className={cls("text-2xl font-medium mb-4", titleClass)}>{title}</p>}

      {children}
    </div>
  );
};
