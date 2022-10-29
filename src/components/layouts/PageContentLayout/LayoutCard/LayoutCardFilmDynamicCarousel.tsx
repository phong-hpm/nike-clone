import { FC } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// components
import { ButtonIcon, IconSvg } from "@root/components/commons";

// components
import LayoutCard from ".";

export interface LayoutCardFilmDynamicCarouselProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardFilmDynamicCarousel: FC<LayoutCardFilmDynamicCarouselProps> = ({
  layoutCardDetail,
}) => {
  return (
    <>
      <div className="flex mb-3 items-center justify-end">
        <div className="shrink-0 basis-32 flex justify-end">
          <ButtonIcon id="swiper-prev" className="bg-neutral-200 disabled:opacity-25 p-3">
            <IconSvg icon="arrow" className="arrow-left" />
          </ButtonIcon>
          <ButtonIcon id="swiper-next" className="bg-neutral-200 disabled:opacity-25 p-3 ml-3">
            <IconSvg icon="arrow" className="arrow-right" />
          </ButtonIcon>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.4}
        spaceBetween={12}
        breakpoints={{ 960: { slidesPerView: 3.1 } }}
        navigation={{ prevEl: "#swiper-prev", nextEl: "#swiper-next" }}
      >
        {(layoutCardDetail?.slides as ILayoutCardDetail[]).map((slide) => {
          return (
            <SwiperSlide key={slide.id}>
              <LayoutCard key={slide.id} layoutCard={{ uid: slide.id, detail: slide }} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default LayoutCardFilmDynamicCarousel;
