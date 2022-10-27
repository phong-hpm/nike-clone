import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// components
import LayoutCard from ".";

export interface LayoutCardFilmStripProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardFilmStrip: FC<LayoutCardFilmStripProps> = ({ layoutCardDetail }) => {
  return (
    <Swiper
      slidesPerView={1.4}
      spaceBetween={12}
      breakpoints={{ 960: { slidesPerView: 3 } }}
      className="page-spacing out-page-spacing"
    >
      {(layoutCardDetail?.slides as ILayoutCardDetail[]).map((slide) => {
        return (
          <SwiperSlide key={slide.id}>
            <LayoutCard key={slide.id} layoutCard={{ uid: slide.id, detail: slide }} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default LayoutCardFilmStrip;
