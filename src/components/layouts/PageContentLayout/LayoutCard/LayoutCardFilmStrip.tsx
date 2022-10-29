import { FC } from "react";
import { SwiperSlide } from "swiper/react";

// components
import { ButtonIcon, CustomSwiper, IconSvg } from "@root/components/commons";

// components
import LayoutCard from ".";

export interface LayoutCardFilmStripProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardFilmStrip: FC<LayoutCardFilmStripProps> = ({ layoutCardDetail }) => {
  return (
    <CustomSwiper title={layoutCardDetail.sectionHeadline.title}>
      {(layoutCardDetail?.slides as ILayoutCardDetail[]).map((slide) => {
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
