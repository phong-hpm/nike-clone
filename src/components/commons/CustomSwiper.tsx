import { Children, FC, useMemo, useRef, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperProps } from "swiper/react";
import { v4 as uuid } from "uuid";

// components
import { ButtonIcon } from "./ButtonIcon";
import { IconSvg } from "./IconSvg";

export interface CustomSwiperProps extends SwiperProps {
  title?: string;
}

export const CustomSwiper: FC<CustomSwiperProps> = ({ title, className, children, ...props }) => {
  const keepRef = useRef({ id: "" });
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number | "auto" | undefined>(
    "auto"
  );

  // Support case: When we have more than 1 swiper in the screen
  const getId = () => {
    if (!keepRef.current.id) keepRef.current.id = uuid();
    return keepRef.current.id;
  };

  const hasNavigation = useMemo(() => {
    if (!currentSlidesPerView) return false;
    if (currentSlidesPerView === "auto") return true;
    return Children.count(children) > currentSlidesPerView;
  }, [children, currentSlidesPerView]);

  return (
    <>
      <div className="flex mb-3 items-center justify-between min-h-12">
        <h3 className="text-2xl font-medium">{title}</h3>

        {hasNavigation && (
          <div className="shrink-0 basis-32 flex justify-end">
            <ButtonIcon
              id={`swiper-prev-${getId()}`}
              className="bg-neutral-200 disabled:opacity-25 p-3"
            >
              <IconSvg icon="arrow" className="arrow-left" />
            </ButtonIcon>
            <ButtonIcon
              id={`swiper-next-${getId()}`}
              className="bg-neutral-200 disabled:opacity-25 p-3 ml-3"
            >
              <IconSvg icon="arrow" className="arrow-right" />
            </ButtonIcon>
          </div>
        )}
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1.4}
        spaceBetween={12}
        breakpoints={{ 960: { slidesPerView: 3 } }}
        onBreakpoint={(_, breakpointParams) =>
          setCurrentSlidesPerView(breakpointParams.slidesPerView)
        }
        className={cls("page-spacing out-page-spacing", className)}
        navigation={
          hasNavigation && {
            prevEl: `#swiper-prev-${getId()}`,
            nextEl: `#swiper-next-${getId()}`,
          }
        }
        {...props}
      >
        {children}
      </Swiper>
    </>
  );
};
