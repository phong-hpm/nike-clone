import { FC } from "react";
import { SwiperSlide } from "swiper/react";

// components
import { CustomSwiper } from "@root/components/commons";

// components
import LayoutCard from ".";

export interface LayoutCardFilmStripProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardFilmStrip: FC<LayoutCardFilmStripProps> = ({ layoutCardDetail }) => {
  const { sectionHeadline, slides } = layoutCardDetail;

  return (
    <CustomSwiper title={sectionHeadline.title}>
      {(slides as ILayoutCardDetail[]).map((slide) => {
        return (
          <SwiperSlide key={slide.id}>
            <LayoutCard key={slide.id} layoutCard={{ uid: slide.id, detail: slide }} />
          </SwiperSlide>
        );
      })}
    </CustomSwiper>
  );
};

export default LayoutCardFilmStrip;
